<?php

namespace App\Http\Controllers;

use App\Http\Requests\LabourRequest;
use App\Models\Labour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LabourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $labours = labour::query()
            ->when($request->search != null, function ($query) use ($request) {
                $search = '%' . $request->search . '%';

                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', $search)
                        ->orWhere('mobile', 'like', $search)
                        ->orWhere('address', 'like', $search);
                });
            })
            ->when($request->status != null, function ($query) use ($request) {
                if ($request->status === 'active') {
                    $query->where('is_active', true);
                } elseif ($request->status === 'inactive') {
                    $query->where('is_active', false);
                }
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Labours/Index', [
            'labours' => $labours
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Labours/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LabourRequest $request)
    {
        Labour::create([
            'user_id' => Auth::id(),
            ...$request->validated(),
        ]);

        return redirect()
            ->route('labours.index')
            ->with('success', 'Labour added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Labour $labour)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Labour $labour)
    {
        return Inertia::render('Labours/Edit', [
            'labour' => $labour,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LabourRequest $request, Labour $labour)
    {
        $labour->update($request->validated());

        return redirect()
            ->route('labours.index')
            ->with('success', 'Labour updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Labour $labour)
    {
        $labour->delete();
        return back()->with('success', 'Labour Deleted Successfully!');
    }
}
