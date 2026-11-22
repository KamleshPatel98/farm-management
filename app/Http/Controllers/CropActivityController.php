<?php

namespace App\Http\Controllers;

use App\Http\Requests\CropActivityRequest;
use App\Models\CropActivity;
use App\Models\FieldCrop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CropActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $cropActivities = CropActivity::where('user_id', auth()->id())
            ->with('fieldcrop:id,field_id,crop_id', 'fieldcrop.field:id,name,farm_id', 'fieldcrop.field.farm:id,name', 'fieldcrop.crop:id,name')
            ->when($request->filled('name'), function ($query) use ($request) {
                $search = '%' . $request->name . '%';

                $query->where(function ($q) use ($search) {
                    $q->WhereHas('fieldcrop.field.farm', fn($sub) => $sub->where('name', 'like', $search))
                        ->orWhereHas('fieldcrop.field', fn($sub) => $sub->where('name', 'like', $search))
                        ->orWhereHas('fieldcrop.crop', fn($sub) => $sub->where('name', 'like', $search));
                });
            })
            ->when($request->date !== null, function ($query) use ($request) {
                $query->where('date', $request->date);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('CropActivities/Index', [
            'cropActivities' => $cropActivities,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $fieldCrops = FieldCrop::select('id', 'field_id', 'crop_id')
            ->with('field:id,name,farm_id', 'field.farm:id,name', 'crop:id,name')
            ->where('user_id', auth()->id())
            ->get();
        return Inertia::render('CropActivities/Create', [
            'fieldCrops' => $fieldCrops,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CropActivityRequest $request)
    {
        CropActivity::create([
            ...$request->validated(),
            'user_id' => auth()->id()
        ]);

        return to_route('crop-activities.index')
            ->with('success', 'Crop Activity created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CropActivity $cropActivity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CropActivity $cropActivity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CropActivity $cropActivity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CropActivity $cropActivity)
    {
        //
    }
}
