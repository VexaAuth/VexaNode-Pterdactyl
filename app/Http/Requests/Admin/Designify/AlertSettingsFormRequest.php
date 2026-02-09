<?php

namespace Pterodactyl\Http\Requests\Admin\Designify;

use Pterodactyl\Http\Requests\Admin\AdminFormRequest;

class AlertSettingsFormRequest extends AdminFormRequest
{
    /**
     * Return all the rules to apply to this request's data.
     */
    public function rules(): array
    {
        return [
            'designify:alertType' => 'required|string',
            'designify:alertMessage' => 'required|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'designify:alertType' => 'Alert Type',
            'designify:alertMessage' => 'Alert Message',
        ];
    }
}
