<?php

namespace Pterodactyl\Http\Requests\Admin\Settings;

use Illuminate\Validation\Rule;
use Pterodactyl\Traits\Helpers\AvailableLanguages;
use Pterodactyl\Http\Requests\Admin\AdminFormRequest;

class BaseSettingsFormRequest extends AdminFormRequest
{
    use AvailableLanguages;

    public function rules(): array
    {
        return [
            'app:name' => 'required|string|max:191',
            'app:logo' => 'required|string|max:191',
            'app:icon' => 'required|string|max:191',
            'pterodactyl:auth:2fa_required' => 'required|integer|in:0,1,2',
            'app:locale' => ['string', Rule::in(array_keys($this->getAvailableLanguages()))],
            'app:debug' => 'required|in:true,false',
            'app:pwa' => 'required|in:true,false',
        ];
    }

    public function attributes(): array
    {
        return [
            'app:name' => 'Company Name',
            'app:logo' => 'Company Logo',
            'app:icon' => 'Company Icon',
            'pterodactyl:auth:2fa_required' => 'Require 2-Factor Authentication',
            'app:locale' => 'Default Language',
            'app:debug' => 'Debug',
            'app:pwa' => 'Progressive Web App',
        ];
    }
}
