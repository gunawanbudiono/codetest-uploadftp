@extends ('backend.layouts.app')

@section ('title', trans('labels.backend.access.users.management') . ' | ' . trans('labels.backend.access.users.create'))

@section('page-header')
    <h1>
        {{ 'Management Administrasi' }}
        <small>{{ 'Check Administrasi & Fisik' }}</small>
    </h1>
@endsection

@section('content')
    {{ Form::open(['route' => 'admin.access.user.store', 'class' => 'form-horizontal', 'role' => 'form', 'method' => 'post']) }}

        <div class="box box-success">
            <div class="box-header with-border">
                <h3 class="box-title">{{ 'Check Administrasi & Fisik' }}</h3>

                
            </div><!-- /.box-header -->

            <div class="box-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="exampleInputEmail1">Lulus SMA Sederajat</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus" value="Islam">YA</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus" value="Kristen">TIDAK</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="exampleInputEmail1">Usia 20 - 35 Tahun</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus1" value="Islam">YA</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus1" value="Kristen">TIDAK</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="exampleInputEmail1">Status Belum Menikah</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus2" value="Islam">YA</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus2" value="Kristen">TIDAK</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="exampleInputEmail1">Sertifikat Satpam</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus3" value="Islam">YA</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus3" value="Kristen">TIDAK</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="exampleInputEmail1">S.K.C.K</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus4" value="Islam">YA</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus4" value="Kristen">TIDAK</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="exampleInputEmail1">Surat Dokter</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus5" value="Islam">YA</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus5" value="Kristen">TIDAK</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="exampleInputEmail1">Surat Lamaran Kerja</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus6" value="Islam">YA</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus6" value="Kristen">TIDAK</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="exampleInputEmail1">Daftar Riwayat Hidup</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus7" value="Islam">YA</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus7" value="Kristen">TIDAK</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="exampleInputEmail1">Foto Copy KTP</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus8" value="Islam">YA</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus8" value="Kristen">TIDAK</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="exampleInputEmail1">Kartu Keluarga</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus9" value="Islam">YA</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus9" value="Kristen">TIDAK</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="exampleInputEmail1">Surat Keterangan Dari Suami (Satpam Wanita)</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus0" value="Islam">YA</label>
                            </div>
                            <div class="col-md-2">
                                <label class="radio-inline"><input type="radio" name="radio-lulus0" value="Kristen">TIDAK</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div><!--box-->

        <div class="box box-info">
            <div class="box-body">
                <div class="pull-left">
                    {{ link_to_route('admin.administrasi.index', trans('buttons.general.cancel'), [], ['class' => 'btn btn-danger btn-xs']) }}
                </div><!--pull-left-->

                <div class="pull-right">
                    {{ link_to_route('admin.administrasi.index', 'Simpan', [], ['class' => 'btn btn-success btn-xs']) }}
                    {{-- Form::submit(trans('buttons.general.crud.create'), ['class' => 'btn btn-success btn-xs']) --}}
                </div><!--pull-right-->

                <div class="clearfix"></div>
            </div><!-- /.box-body -->
        </div><!--box-->

    {{ Form::close() }}
@endsection

@section('after-scripts')
    {{ Html::script('js/backend/access/users/script.js') }}
@endsection
