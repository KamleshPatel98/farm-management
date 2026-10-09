<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FieldRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'farm_id' => [
                'required',
                'integer',
                Rule::exists('farms', 'id')->where(
                    fn ($query) => $query->where('user_id', auth()->id())
                ),
            ],

            'name' => ['required', 'string', 'max:255'],
            'area' => ['required', 'numeric', 'min:0.01'],
            'area_unit' => ['required', 'in:acre, hectare, decimal'],
            'soil_type' => ['nullable', 'string', 'max:255'],
            'water_source' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'boolean'],
        ];
    }
}
