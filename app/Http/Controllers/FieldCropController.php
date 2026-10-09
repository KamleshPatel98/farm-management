<?php

namespace App\Http\Controllers;

use App\Http\Requests\FieldCropRequest;
use App\Models\Crop;
use App\Models\Field;
use App\Models\FieldCrop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FieldCropController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fieldCrops = FieldCrop::where('user_id', auth()->id())
            ->with([
                'field:id,farm_id,name,area,area_unit',
                'field.farm:id,name',
                'crop:id,name',
            ])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('FieldCrops/Index', [
            'fieldCrops' => $fieldCrops,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userId = auth()->id();

        $fields = Field::where('user_id', $userId)
            ->where('status', true)
            ->with('farm:id,name')
            ->orderBy('name')
            ->get([
                'id',
                'farm_id',
                'name',
                'area',
                'area_unit',
            ]);

        if ($fields->isEmpty()) {
            return to_route('fields.index')
                ->with(
                    'error',
                    'Please create an active field before assigning a crop.'
                );
        }

        $crops = Crop::where('user_id', $userId)
            ->orderBy('name')
            ->get(['id', 'name']);

        if ($crops->isEmpty()) {
            return to_route('crops.index')
                ->with(
                    'error',
                    'Please create a crop before assigning it to a field.'
                );
        }

        return Inertia::render('FieldCrops/Create', [
            'fields' => $fields,
            'crops' => $crops,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FieldCropRequest $request)
    {
        FieldCrop::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return to_route('field-crops.index')
            ->with('success', 'Field crop created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(FieldCrop $fieldCrop)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FieldCrop $fieldCrop)
    {
        $userId = auth()->id();

        abort_unless(
            $fieldCrop->user_id === $userId,
            403
        );

        $fields = Field::where('user_id', $userId)
            ->where('status', true)
            ->with('farm:id,name')
            ->orderBy('name')
            ->get([
                'id',
                'farm_id',
                'name',
                'area',
                'area_unit',
            ]);

        $crops = Crop::where('user_id', $userId)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('FieldCrops/Edit', [
            'fieldCrop' => $fieldCrop,
            'fields' => $fields,
            'crops' => $crops,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FieldCropRequest $request, FieldCrop $fieldCrop)
    {
        abort_unless(
            $fieldCrop->user_id === $request->user()->id,
            403
        );

        $fieldCrop->update($request->validated());

        return to_route('field-crops.index')
            ->with('success', 'Field crop updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FieldCrop $fieldCrop)
    {
        abort_unless(
            $fieldCrop->user_id === auth()->id(),
            403
        );

        $fieldCrop->delete();

        return to_route('field-crops.index')
            ->with('success', 'Field crop deleted successfully.');
    }
}
