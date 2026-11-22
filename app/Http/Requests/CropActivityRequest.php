<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CropActivityRequest extends FormRequest
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
            'field_crop_id' => [
                'required',
                'integer',
                Rule::exists('field_crops', 'id')->where('user_id', auth()->id()),
            ],
            'name' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'notes' => ['required', 'string'],
        ];
    }

    /**
     * Custom attribute names for validation messages.
     */
    public function attributes(): array
    {
        return [
            'field_crop_id' => 'field crop',
            'name' => 'activity name',
        ];
    }
}
