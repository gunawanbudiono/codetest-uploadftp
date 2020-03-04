<?php

namespace App\Http\Requests\Frontend\FormPelamar;

use App\Http\Requests\Request;

/**
 * Class SendContactRequest.
 */
class FormPelamarRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules['data_pelamars.nama'] = 'required';

        return $rules;
    }
}
