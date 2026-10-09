<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FieldCropRequest extends FormRequest
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
        $userId = auth()->id();

        return [
            'field_id' => [
                'required',
                'integer',
                Rule::exists('fields', 'id')->where(
                    fn ($query) => $query->where('user_id', $userId)
                ),
            ],

            'crop_id' => [
                'required',
                'integer',
                Rule::exists('crops', 'id')->where(
                    fn ($query) => $query->where('user_id', $userId)
                ),
            ],

            'season' => ['nullable','string','max:100'],
            'sowing_date' => ['nullable','date',],
            'expected_harvest_date' => ['nullable','date','after_or_equal:sowing_date',],
            'area' => ['required','numeric','min:0.01',],
            'status' => ['required','in:planned,sown,growing,harvested'],
        ];
    }
}
