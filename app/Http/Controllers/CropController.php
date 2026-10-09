<?php

namespace App\Http\Controllers;

use App\Http\Requests\CropRequest;
use App\Models\Crop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CropController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $crops = Crop::where('user_id', auth()->id())
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Crops/Index', [
            'crops' => $crops,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Crops/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CropRequest $request)
    {
        Crop::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        return to_route('crops.index')
            ->with('success', 'Crop created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Crop $crop)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Crop $crop)
    {
        abort_unless(
            $crop->user_id === auth()->id(),
            403
        );

        return Inertia::render('Crops/Edit', [
            'crop' => $crop,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CropRequest $request, Crop $crop)
    {
        abort_unless(
            $crop->user_id === auth()->id(),
            403
        );

        $crop->update($request->validated());

        return to_route('crops.index')
            ->with('success', 'Crop updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Crop $crop)
    {
        abort_unless(
            $crop->user_id === auth()->id(),
            403
        );

        $crop->delete();

        return to_route('crops.index')
            ->with('success', 'Crop deleted successfully.');
    }
}
