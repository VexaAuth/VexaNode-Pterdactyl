@extends('layouts.admin')
@include('partials/admin.settings.nav', ['activeTab' => 'mail'])

@section('title')
    @lang('admin/settings.mail.title')
@endsection

@section('content-header')
    <h1>Mail Settings<small>Configure how Pterodactyl should handle sending emails.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Settings</li>
    </ol>
@endsection

@section('content')
    @yield('settings::nav')
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">@lang('admin/settings.mail.email-title')</h3>
                </div>
                @if ($disabled)
                    <div class="box-body">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="alert alert-info no-margin-bottom">
                                    @lang('admin/settings.mail.smtp-alert')
                                </div>
                            </div>
                        </div>
                    </div>
                @else
                    <form>
                        <div class="box-body">
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label class="control-label">@lang('admin/settings.mail.host-label')</label>
                                    <div>
                                        <input required type="text" class="form-control" name="mail:mailers:smtp:host"
                                            value="{{ old('mail:mailers:smtp:host', config('mail.mailers.smtp.host')) }}" />
                                    </div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="control-label">@lang('admin/settings.mail.port-label')</label>
                                    <div>
                                        <input required type="number" class="form-control" name="mail:mailers:smtp:port"
                                            value="{{ old('mail:mailers:smtp:port', config('mail.mailers.smtp.port')) }}" />
                                    </div>
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="control-label">@lang('admin/settings.mail.encryption-label')</label>
                                    <div>
                                        @php
                                            $encryption = old(
                                                'mail:mailers:smtp:encryption',
                                                config('mail.mailers.smtp.encryption'),
                                            );
                                        @endphp
                                        <select name="mail:mailers:smtp:encryption" class="form-control">
                                            <option value="" @if ($encryption === '') selected @endif>None
                                            </option>
                                            <option value="tls" @if ($encryption === 'tls') selected @endif>
                                                Transport Layer Security (TLS)</option>
                                            <option value="ssl" @if ($encryption === 'ssl') selected @endif>Secure
                                                Sockets Layer (SSL)</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="control-label">@lang('admin/settings.mail.username') <span class="field-optional"></span></label>
                                    <div>
                                        <input type="text" class="form-control" name="mail:mailers:smtp:username"
                                            value="{{ old('mail:mailers:smtp:username', config('mail.mailers.smtp.username')) }}" />
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="control-label">@lang('admin/settings.mail.password') <span class="field-optional"></span></label>
                                    <div>
                                        <input type="password" class="form-control" name="mail:mailers:smtp:password" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <hr />
                                <div class="form-group col-md-6">
                                    <label class="control-label">@lang('admin/settings.mail.from-label')</label>
                                    <div>
                                        <input required type="email" class="form-control" name="mail:from:address"
                                            value="{{ old('mail:from:address', config('mail.from.address')) }}" />
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="control-label">@lang('admin/settings.mail.from-name-label') <span class="field-optional"></span></label>
                                    <div>
                                        <input type="text" class="form-control" name="mail:from:name"
                                            value="{{ old('mail:from:name', config('mail.from.name')) }}" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="box-footer">
                            {{ csrf_field() }}
                            <div class="pull-right">
                                <button type="button" id="testButton" class="btn btn-sm btn-success">@lang('admin/settings.mail.test-btn')</button>
                                <button type="button" id="saveButton" class="btn btn-sm btn-primary">@lang('admin/settings.mail.save-btn')</button>
                            </div>
                        </div>
                    </form>
                @endif
            </div>
        </div>
    </div>
@endsection

@section('footer-scripts')
    @parent
    <script>
        function saveSettings() {
            return $.ajax({
                method: 'PATCH',
                url: '/admin/settings/mail',
                contentType: 'application/json',
                data: JSON.stringify({
                    'mail:mailers:smtp:host': $('input[name="mail:mailers:smtp:host"]').val(),
                    'mail:mailers:smtp:port': $('input[name="mail:mailers:smtp:port"]').val(),
                    'mail:mailers:smtp:encryption': $('select[name="mail:mailers:smtp:encryption"]').val(),
                    'mail:mailers:smtp:username': $('input[name="mail:mailers:smtp:username"]').val(),
                    'mail:mailers:smtp:password': $('input[name="mail:mailers:smtp:password"]').val(),
                    'mail:from:address': $('input[name="mail:from:address"]').val(),
                    'mail:from:name': $('input[name="mail:from:name"]').val()
                }),
                headers: {
                    'X-CSRF-Token': $('input[name="_token"]').val()
                }
            }).fail(function(jqXHR) {
                showErrorDialog(jqXHR, 'save');
            });
        }

        function testSettings() {
            swal({
                type: 'info',
                title: 'Test Mail Settings',
                text: 'Click "Test" to begin the test.',
                showCancelButton: true,
                confirmButtonText: 'Test',
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function() {
                $.ajax({
                    method: 'POST',
                    url: '/admin/settings/mail/test',
                    headers: {
                        'X-CSRF-TOKEN': $('input[name="_token"]').val()
                    }
                }).fail(function(jqXHR) {
                    showErrorDialog(jqXHR, 'test');
                }).done(function() {
                    swal({
                        title: 'Success',
                        text: 'The test message was sent successfully.',
                        type: 'success'
                    });
                });
            });
        }

        function saveAndTestSettings() {
            saveSettings().done(testSettings);
        }

        function showErrorDialog(jqXHR, verb) {
            var errorText = '';
            if (!jqXHR.responseJSON) {
                errorText = jqXHR.responseText;
            } else if (jqXHR.responseJSON.error) {
                errorText = jqXHR.responseJSON.error;
            } else if (jqXHR.responseJSON.errors) {
                $.each(jqXHR.responseJSON.errors, function(i, v) {
                    if (v.detail) {
                        errorText += v.detail + ' ';
                    }
                });
            }
            swal({
                title: 'Whoops!',
                text: 'An error occurred while attempting to ' + verb + ' mail settings: ' + errorText,
                type: 'error'
            });
        }

        $(document).ready(function() {
            $('#testButton').on('click', saveAndTestSettings);
            $('#saveButton').on('click', function() {
                saveSettings().done(function() {
                    swal({
                        title: 'Success',
                        text: 'Mail settings have been updated successfully and the queue worker was restarted to apply these changes.',
                        type: 'success'
                    });
                });
            });
        });
    </script>
@endsection
