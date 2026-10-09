<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CropRequest extends FormRequest
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
        $crop = $this->route('crop');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('crops', 'name')
                    ->where('user_id', auth()->id())
                    ->ignore($crop?->id),
            ],

            'crop_type' => ['required', 'in:Cereal,Pulse,Vegetable,Fruit,Oilseed,Spice,Other'],
            'duration_days' => ['nullable', 'integer', 'min:1', 'max:32767'],
            'scientific_name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'boolean'],
        ];
    }
}
