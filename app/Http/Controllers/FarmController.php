<?php

namespace App\Http\Controllers;

use App\Http\Requests\FarmRequest;
use App\Models\Farm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FarmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $farms = Farm::where('user_id', auth()->id())
            ->latest()
            ->paginate(3)
            ->withQueryString();

        return Inertia::render('Farms/Index', [
            'farms' => $farms,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Farms/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FarmRequest $request)
    {
        Farm::create([
            'user_id' => auth()->id(),
            ...$request->validated(),
        ]);

        return to_route('farms.index')
            ->with('success', 'Farm created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Farm $farm)
    {
        abort_unless(
            $farm->user_id === auth()->id(),
            403
        );

        return Inertia::render('Farms/Edit', [
            'farm' => $farm,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FarmRequest $request, Farm $farm) {
        abort_unless(
            $farm->user_id === auth()->id(),
            403
        );

        $farm->update($request->validated());

        return to_route('farms.index')
            ->with('success', 'Farm updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Farm $farm)
    {
        abort_unless(
            $farm->user_id === auth()->id(),
            403
        );

        $farm->delete();

        return to_route('farms.index')
            ->with('success', 'Farm deleted successfully.');
    }
}
