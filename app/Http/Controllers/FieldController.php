<?php

namespace App\Http\Controllers;

use App\Http\Requests\FieldRequest;
use App\Models\Farm;
use App\Models\Field;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FieldController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fields = Field::where('user_id', auth()->id())
            ->with('farm:id,name')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Fields/Index', [
            'fields' => $fields,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $farms = Farm::where('user_id', auth()->id())
            ->where('status', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        if ($farms->isEmpty()) {
            return to_route('farms.index')
                ->with('error', 'Please create an active farm before adding a field.');
        }

        return Inertia::render('Fields/Create', [
            'farms' => $farms,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FieldRequest $request)
    {
        Field::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        return to_route('fields.index')
            ->with('success', 'Field created successfully.');
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
    public function edit(Request $request, Field $field)
    {
        abort_unless($field->user_id === auth()->id(), 403);

        $farms = Farm::where('user_id', $request->user()->id)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Fields/Edit', [
            'field' => $field,
            'farms' => $farms,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(FieldRequest $request, Field $field)
    {
        abort_unless($field->user_id === $request->user()->id, 403);

        $field->update($request->validated());

        return to_route('fields.index')
            ->with('success', 'Field updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Field $field)
    {
        abort_unless($field->user_id === auth()->id(), 403);

        $field->delete();

        return to_route('fields.index')
            ->with('success', 'Field deleted successfully.');
    }
}
