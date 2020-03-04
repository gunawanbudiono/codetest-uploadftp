@extends ('backend.layouts.app')

@section ('title', trans('labels.backend.access.users.management'))

@section('after-styles')
    {{ Html::style("https://cdn.datatables.net/v/bs/dt-1.10.15/datatables.min.css") }}
@endsection

@section('page-header')
    <h1>
        {{ 'Management Administrasi' }}
        <small>{{ 'List Cek Administrasi & Fisik' }}</small>
    </h1>
@endsection

@section('content')
    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">{{ 'List Cek Administrasi & Fisik' }}</h3>

            <div class="box-tools pull-right">
                <div class="pull-right mb-10 hidden-sm hidden-xs">
                    <a href="http://127.0.0.1:8000/admin/access/user" class="btn btn-primary btn-xs">Semua Pengguna</a>
                    <a href="http://127.0.0.1:8000/admin/access/user/create" class="btn btn-success btn-xs">Buat Pengguna</a>
                    <a href="http://127.0.0.1:8000/admin/access/user/deactivated" class="btn btn-warning btn-xs">Pengguna Dinonaktifkan</a>
                    <a href="http://127.0.0.1:8000/admin/access/user/deleted" class="btn btn-danger btn-xs">Pengguna Dihapus</a>
                </div><!--pull right-->

                <div class="pull-right mb-10 hidden-lg hidden-md">
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            Pengguna <span class="caret"></span>
                        </button>

                        <ul class="dropdown-menu" role="menu">
                            <li><a href="http://127.0.0.1:8000/admin/access/user">Semua Pengguna</a></li>
                            <li><a href="http://127.0.0.1:8000/admin/access/user/create">Buat Pengguna</a></li>
                            <li class="divider"></li>
                            <li><a href="http://127.0.0.1:8000/admin/access/user/deactivated">Pengguna Dinonaktifkan</a></li>
                            <li><a href="http://127.0.0.1:8000/admin/access/user/deleted">Pengguna Dihapus</a></li>
                        </ul>
                    </div><!--btn group-->
                </div><!--pull right-->

                <div class="clearfix"></div>            
            </div>
        </div><!-- /.box-header -->

        <div class="box-body">
            <div class="table-responsive">
                <table id="users-table" class="table table-condensed table-hover">
                    <thead>
                    <tr>
                        <th>{{ 'Nama Lengkap' }}</th>
                        <th>{{ 'Tempat Lahir' }}</th>
                        <th>{{ 'Tanggal Lahir' }}</th>
                        <th>{{ 'Jenis Kelamin' }}</th>
                        <th>{{ 'Agama' }}</th>
                        <th>{{ 'Status' }}</th>
                        <th>{{ 'Alamat Tinggal' }}</th>
                        <th>{{ 'Action' }}</th>
                        <!-- <td>
                            <a href="http://127.0.0.1:8000/admin/access/user/1" class="btn btn-xs btn-info">
                                <i class="fa fa-search" data-toggle="tooltip" data-placement="top" title="Lihat"></i>
                            </a> 
                            <a href="http://127.0.0.1:8000/admin/administrasi/cek" class="btn btn-xs btn-primary">
                                <i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="Edit"></i>
                            </a> 
                            <a href="http://127.0.0.1:8000/admin/access/user/1/password/change" class="btn btn-xs btn-info">
                                <i class="fa fa-refresh" data-toggle="tooltip" data-placement="top" title="Ubah Sandi"></i>
                            </a> 
                        </td> -->
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Paul Leman</td>
                        <td>Tangerang</td>
                        <td>03/08/1997</td>
                        <td>Laki - Laki</td>
                        <td>Islam</td>
                        <td><span class="label label-danger">Belum Di Cek</span></td>
                        <td>Jalan Lombok</td>
                        <td>
                            <a href="http://127.0.0.1:8000/admin/access/user/1" class="btn btn-xs btn-info">
                                <i class="fa fa-search" data-toggle="tooltip" data-placement="top" title="Lihat"></i>
                            </a> 
                            <a href="http://127.0.0.1:8000/admin/administrasi/cek" class="btn btn-xs btn-primary">
                                <i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="Edit"></i>
                            </a> 
                            <a href="http://127.0.0.1:8000/admin/access/user/1/password/change" class="btn btn-xs btn-info">
                                <i class="fa fa-refresh" data-toggle="tooltip" data-placement="top" title="Ubah Sandi"></i>
                            </a> 
                        </td> 
                    </tr>
                    <tr>
                        <td>Anjas Prasitia</td>
                        <td>Tangerang</td>
                        <td>03/08/1997</td>
                        <td>Laki - Laki</td>
                        <td>Islam</td>
                        <td><span class="label label-success">Sudah Di Cek</span></td>
                        <td>Jalan Lombok</td>
                        <td>
                            <a href="http://127.0.0.1:8000/admin/access/user/1" class="btn btn-xs btn-info">
                                <i class="fa fa-search" data-toggle="tooltip" data-placement="top" title="Lihat"></i>
                            </a> 
                            <a href="http://127.0.0.1:8000/admin/administrasi/cek" class="btn btn-xs btn-primary">
                                <i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="Edit"></i>
                            </a> 
                            <a href="http://127.0.0.1:8000/admin/access/user/1/password/change" class="btn btn-xs btn-info">
                                <i class="fa fa-refresh" data-toggle="tooltip" data-placement="top" title="Ubah Sandi"></i>
                            </a> 
                        </td> 
                    </tr>
                    <tr>
                        <td>Abdul Majid</td>
                        <td>Tangerang</td>
                        <td>03/08/1997</td>
                        <td>Laki - Laki</td>
                        <td>Islam</td>
                        <td><span class="label label-danger">Belum Di Cek</span></td>
                        <td>Jalan Lombok</td>
                        <td>
                            <a href="http://127.0.0.1:8000/admin/access/user/1" class="btn btn-xs btn-info">
                                <i class="fa fa-search" data-toggle="tooltip" data-placement="top" title="Lihat"></i>
                            </a> 
                            <a href="http://127.0.0.1:8000/admin/administrasi/cek" class="btn btn-xs btn-primary">
                                <i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="Edit"></i>
                            </a> 
                            <a href="http://127.0.0.1:8000/admin/access/user/1/password/change" class="btn btn-xs btn-info">
                                <i class="fa fa-refresh" data-toggle="tooltip" data-placement="top" title="Ubah Sandi"></i>
                            </a> 
                        </td> 
                    </tr>
                    <tr>
                        <td>Rahmat Hidayat</td>
                        <td>Tangerang</td>
                        <td>03/08/1997</td>
                        <td>Laki - Laki</td>
                        <td>Islam</td>
                        <td><span class="label label-danger">Belum Di Cek</span></td>
                        <td>Jalan Lombok</td>
                        <td>
                            <a href="http://127.0.0.1:8000/admin/access/user/1" class="btn btn-xs btn-info">
                                <i class="fa fa-search" data-toggle="tooltip" data-placement="top" title="Lihat"></i>
                            </a> 
                            <a href="http://127.0.0.1:8000/admin/administrasi/cek" class="btn btn-xs btn-primary">
                                <i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="Edit"></i>
                            </a> 
                            <a href="http://127.0.0.1:8000/admin/access/user/1/password/change" class="btn btn-xs btn-info">
                                <i class="fa fa-refresh" data-toggle="tooltip" data-placement="top" title="Ubah Sandi"></i>
                            </a> 
                        </td> 
                    </tr>
                    </tbody>
                </table>
            </div><!--table-responsive-->
        </div><!-- /.box-body -->
    </div><!--box-->

    <div class="box box-info">
        <div class="box-header with-border">
            <h3 class="box-title">{{ trans('history.backend.recent_history') }}</h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div><!-- /.box tools -->
        </div><!-- /.box-header -->
        <div class="box-body">
        </div><!-- /.box-body -->
    </div><!--box box-success-->
@endsection

@section('after-scripts')
    {{ Html::script("https://cdn.datatables.net/v/bs/dt-1.10.15/datatables.min.js") }}
    {{ Html::script("js/backend/plugin/datatables/dataTables-extend.js") }}

    <script>
        
    </script>
@endsection
