<?php

namespace Pterodactyl\Http\Controllers\Base;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Pterodactyl\Http\Controllers\Controller;

class PwaManifestController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'name' => config('app.name'),
            'short_name' => config('app.name'),
            'start_url' => '/',
            'display' => 'standalone',
            'background_color' => '#07070C',
            'theme_color' => '#3b82f6',
            'orientation' => 'portrait',
            'icons' => [
                [
                    'src' => asset('favicons/android-icon-192x192.png'),
                    'sizes' => '192x192',
                    'type' => 'image/png',
                ],
                [
                    'src' => asset('favicons/android-chrome-512x512.png'),
                    'sizes' => '512x512',
                    'type' => 'image/png',
                ],
            ],
        ]);
    }
}