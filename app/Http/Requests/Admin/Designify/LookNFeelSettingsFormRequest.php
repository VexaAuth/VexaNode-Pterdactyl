<?php

namespace Pterodactyl\Http\Requests\Admin\Designify;

use Pterodactyl\Http\Requests\Admin\AdminFormRequest;

class LookNFeelSettingsFormRequest extends AdminFormRequest
{
    /**
     * Return all the rules to apply to this request's data.
     */
    public function rules(): array
    {
        return [
            'designify:themeSelector' => 'required|in:true,false',
            'designify:sidebarLogout' => 'required|in:true,false',
            'designify:background' => 'required|string',
            'designify:allocationBlur' => 'required|in:true,false',
            'designify:radius' => 'required|string',
            'designify:fontFamily' => 'required|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'designify:themeSelector' => 'Theme Selector',
            'designify:sidebarLogout' => 'Sidebar Logout Button',
            'designify:background' => 'Panel Background',
            'designify:allocationBlur' => 'Allocation Blur',
            'designify:radius' => 'Border Radius',
            'designify:fontFamily' => 'Font Family',
        ];
    }
}
