@extends('frontend.layouts.app')
    <style type="text/css">
        .wizard {
            margin: 20px auto;
            background: #fff;
        }

            .wizard .nav-tabs {
                position: relative;
                margin: 40px auto;
                margin-bottom: 0;
                border-bottom-color: #e0e0e0;
            }

            .wizard > div.wizard-inner {
                position: relative;
            }

        .connecting-line {
            height: 2px;
            background: #e0e0e0;
            position: absolute;
            width: 80%;
            margin: 0 auto;
            left: 0;
            right: 0;
            top: 50%;
            z-index: 1;
        }

        .wizard .nav-tabs > li.active > a, .wizard .nav-tabs > li.active > a:hover, .wizard .nav-tabs > li.active > a:focus {
            color: #555555;
            cursor: default;
            border: 0;
            border-bottom-color: transparent;
        }

        span.round-tab {
            width: 70px;
            height: 70px;
            line-height: 70px;
            display: inline-block;
            border-radius: 100px;
            background: #fff;
            border: 2px solid #e0e0e0;
            z-index: 2;
            position: absolute;
            left: 0;
            text-align: center;
            font-size: 25px;
        }
        span.round-tab i{
            color:#555555;
            margin-top: 20px;
        }
        .wizard li.active span.round-tab {
            background: #fff;
            border: 2px solid #5bc0de;
            
        }
        .wizard li.active span.round-tab i{
            color: #5bc0de;
        }

        span.round-tab:hover {
            color: #333;
            border: 2px solid #333;
        }

        .wizard .nav-tabs > li {
            width: 16.6%;
        }

        .wizard li:after {
            content: " ";
            position: absolute;
            left: 46%;
            opacity: 0;
            margin: 0 auto;
            bottom: 0px;
            border: 5px solid transparent;
            border-bottom-color: #5bc0de;
            transition: 0.1s ease-in-out;
        }

        .wizard li.active:after {
            content: " ";
            position: absolute;
            left: 46%;
            opacity: 1;
            margin: 0 auto;
            bottom: 0px;
            border: 10px solid transparent;
            border-bottom-color: #5bc0de;
        }

        .wizard .nav-tabs > li a {
            width: 70px;
            height: 70px;
            margin: 20px auto;
            border-radius: 100%;
            padding: 0;
        }

            .wizard .nav-tabs > li a:hover {
                background: transparent;
            }

        .wizard .tab-pane {
            position: relative;
            padding-top: 50px;
        }

        .wizard h3 {
            margin-top: 0;
        }
        .step1 .row {
            margin-bottom:10px;
        }
        .step_21 {
            border :1px solid #eee;
            border-radius:5px;
            padding:10px;
        }
        .step33 {
            border:1px solid #ccc;
            border-radius:5px;
            padding-left:10px;
            margin-bottom:10px;
        }
        .dropselectsec {
            width: 68%;
            padding: 6px 5px;
            border: 1px solid #ccc;
            border-radius: 3px;
            color: #333;
            margin-left: 10px;
            outline: none;
            font-weight: normal;
        }
        .dropselectsec1 {
            width: 74%;
            padding: 6px 5px;
            border: 1px solid #ccc;
            border-radius: 3px;
            color: #333;
            margin-left: 10px;
            outline: none;
            font-weight: normal;
        }
        .mar_ned {
            margin-bottom:10px;
        }
        .wdth {
            width:25%;
        }
        .birthdrop {
            padding: 6px 5px;
            border: 1px solid #ccc;
            border-radius: 3px;
            color: #333;
            margin-left: 10px;
            width: 16%;
            outline: 0;
            font-weight: normal;
        }


        /* according menu */
        #accordion-container {
            font-size:13px
        }
        .accordion-header {
            font-size:13px;
            background:#ebebeb;
            margin:5px 0 0;
            padding:7px 20px;
            cursor:pointer;
            color:#fff;
            font-weight:400;
            -moz-border-radius:5px;
            -webkit-border-radius:5px;
            border-radius:5px
        }
        .unselect_img{
            width:18px;
            -webkit-user-select: none;  
            -moz-user-select: none;     
            -ms-user-select: none;      
            user-select: none; 
        }
        .active-header {
            -moz-border-radius:5px 5px 0 0;
            -webkit-border-radius:5px 5px 0 0;
            border-radius:5px 5px 0 0;
            background:#F53B27;
        }
        .active-header:after {
            content:"\f068";
            font-family:'FontAwesome';
            float:right;
            margin:5px;
            font-weight:400
        }
        .inactive-header {
            background:#333;
        }
        .inactive-header:after {
            content:"\f067";
            font-family:'FontAwesome';
            float:right;
            margin:4px 5px;
            font-weight:400
        }
        .accordion-content {
            display:none;
            padding:20px;
            background:#fff;
            border:1px solid #ccc;
            border-top:0;
            -moz-border-radius:0 0 5px 5px;
            -webkit-border-radius:0 0 5px 5px;
            border-radius:0 0 5px 5px
        }
        .accordion-content a{
            text-decoration:none;
            color:#333;
        }
        .accordion-content td{
            border-bottom:1px solid #dcdcdc;
        }



        @media( max-width : 585px ) {

            .wizard {
                width: 90%;
                height: auto !important;
            }

            span.round-tab {
                font-size: 16px;
                width: 50px;
                height: 50px;
                line-height: 50px;
            }

            .wizard .nav-tabs > li a {
                width: 50px;
                height: 50px;
                line-height: 50px;
            }

            .wizard li.active:after {
                content: " ";
                position: absolute;
                left: 35%;
            }
        }
        .btn-file {
            position: relative;
            overflow: hidden;
        }
        .btn-file input[type=file] {
            position: absolute;
            top: 0;
            right: 0;
            min-width: 100%;
            min-height: 100%;
            font-size: 100px;
            text-align: right;
            filter: alpha(opacity=0);
            opacity: 0;
            outline: none;
            background: white;
            cursor: inherit;
            display: block;
        }

        #img-upload{
            width: 100%;
        }
    </style>
@section('content')
    <div class="container">
        <div class="row">
            <section>
            <div class="wizard">
                <div class="wizard-inner" style="margin:20px">
                    <div class="connecting-line"></div>
                    <ul class="nav nav-tabs" role="tablist">

                        <li role="presentation" class="active">
                            <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="DATA PELAMAR">
                                <span class="round-tab">
                                    <i class="fa fa-address-card"></i>
                                </span>
                            </a>
                        </li>

                        <li role="presentation" class="disabled">
                            <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" title="DATA FISIK PELAMAR">
                                <span class="round-tab">
                                    <i class="fa fa-plus-square"></i>
                                </span>
                            </a>
                        </li>
                        <li role="presentation" class="disabled">
                            <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="Data Pendidikan">
                                <span class="round-tab">
                                    <i class="fa fa-university"></i>
                                </span>
                            </a>
                        </li>

                        <li role="presentation" class="disabled">
                            <a href="#step4" data-toggle="tab" aria-controls="complete" role="tab" title="Data Keluarga">
                                <span class="round-tab">
                                    <i class="fa fa-users"></i>
                                </span>
                            </a>
                        </li>
                        <li role="presentation" class="disabled">
                            <a href="#step5" data-toggle="tab" aria-controls="complete" role="tab" title="Document Upload">
                                <span class="round-tab">
                                    <i class="fa fa-upload"></i>
                                </span>
                            </a>
                        </li>
                        <li role="presentation" class="disabled">
                            <a href="#step6" data-toggle="tab" aria-controls="complete" role="tab" title="Pengalaman Kerja">
                                <span class="round-tab">
                                    <i class="fa fa-clipboard"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div style="margin:20px;">
                {{ Form::open(['route' => 'frontend.formPost', 'class' => 'form-horizontal']) }}
                    <div class="tab-content">
                        <div class="tab-pane active" role="tabpanel" id="step1">
                            <h3><strong>DATA PELAMAR</strong></h3>
                            <hr>
                            <div class="step1">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="nama">Nama Lengkap (Sesuai KTP)</label>
                                        <input type="text" name="data_pelamars[nama]" class="form-control" id="nama" placeholder="Nama Lengkap">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-8">
                                        <label for="tempat_lahir">Tempat / Tanggal Lahir</label>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <input type="text" class="form-control" id="tempat_lahir" name="data_pelamars[tempat_lahir]" placeholder="Tempat Lahir">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="date" class="form-control" id="tanggal_lahir" name="data_pelamars[tanggal_lahir]" placeholder="Tanggal Lahir">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="umur">Umur</label>
                                        <input type="text" class="form-control" name="data_pelamars[umur]" id="umur" placeholder="Umur">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="jns_kelamin">Jenis Kelamin</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" onclick="changeInputValue(this);" id="jns_kelamin_pria" data-select='jns_kelamin' name="radio-jns-kelamin" value="Pria">Pria</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" onclick="changeInputValue(this);" data-select="jns_kelamin" id="jns_kelamin_wanita" name="radio-jns-kelamin" value="Wanita">Wanita</label>
                                            </div>
                                            <input type="text" style="display: none" id="jns_kelamin" name="data_pelamars[jns_kelamin]"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="radio-agama">Agama</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" data-select="agama" name="radio-agama" value="Islam" onclick="changeInputValue(this);">Islam</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" data-select="agama" name="radio-agama" value="Kristen" onclick="changeInputValue(this);">Kristen</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" data-select="agama" name="radio-agama" value="Katolik" onclick="changeInputValue(this);">Katolik</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-agama" value="Hindu" data-select="agama" onclick="changeInputValue(this);">Hindu</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" data-select="agama" name="radio-agama" value="Budha" onclick="changeInputValue(this);">Budha</label>
                                            </div>
                                            <input type="text" style="display: none" id="agama" name="data_pelamars[agama]"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="alamat_tinggal">Alamat Tinggal</label>
                                        <textarea class="form-control" rows="5" name="data_pelamars[alamat_tinggal]" id="alamat_tinggal"></textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label for="alamat_tinggal_kecamatan">Kecamatan</label>
                                                <input type="text" class="form-control" id="alamat_tinggal_kecamatan" name="data_pelamars[alamat_tinggal_kecamatan]" placeholder="Kecamatan">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="exampleInputEmail1">Kota</label>
                                                <input type="text" class="form-control" id="alamat_tinggal_kota" name="data_pelamars[alamat_tinggal_kota]" placeholder="Kota">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="status_tempat_tinggal">Status Tempat Tinggal</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="status_tempat_tinggal" value="Milik Sendiri" data-select="status_tempat_tinggal" onclick="changeInputValue(this);">Milik Sendiri</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="status_tempat_tinggal" value="Keluarga" data-select="status_tempat_tinggal" onclick="changeInputValue(this);">Keluarga</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="status_tempat_tinggal" value="Kontrak / Kos" data-select="status_tempat_tinggal" onclick="changeInputValue(this);">Kontrak / Kos</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="status_tempat_tinggal" value="Lainnya" data-select="status_tempat_tinggal" onclick="changeInputValue(this);">Lainnya</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" class="form-control" style="display: none" id="status_tempat_tinggal" name="data_pelamars[status_tempat_tinggal]"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="no_tlp">Telpon Rumah / Ponsel</label>
                                        <input type="text" class="form-control" id="no_tlp" name="data_pelamars[no_tlp]" placeholder="Telpon Rumah / Ponsel">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="no_id">No. Identitas (KTP / SIM)</label>
                                        <input type="text" class="form-control" id="no_id" name="data_pelamars[no_id]" placeholder="No. Identitas (KTP / SIM)">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="status_nikah">Status Nikah</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-nikah" value="Belum Menikah" data-select="status_nikah" onclick="changeInputValue(this);">Belum Menikah</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-nikah" value="Menikah" data-select="status_nikah" onclick="changeInputValue(this);">Menikah</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-nikah" value="Duda" data-select="status_nikah" onclick="changeInputValue(this);">Duda</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-nikah" value="Janda" data-select="status_nikah" onclick="changeInputValue(this);">Janda</label>
                                            </div>
                                            <input type="text" class="form-control" style="display: none" id="status_nikah" name="data_pelamars[status_nikah]"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="nama_pasangan">Nama Suami / Istri</label>
                                        <input type="text" class="form-control" id="nama_pasangan" name="data_pelamars[nama_pasangan]" placeholder="Nama Suami / Istri">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="tgl_lahir_pasangan">Tanggal Lahir</label>
                                        <input type="date" class="form-control" id="tgl_lahir_pasangan" name="data_pelamars[tgl_lahir_pasangan]" placeholder="Tanggal Lahir">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="nama_anak1">Nama Anak 1</label>
                                        <input type="text" class="form-control" id="nama_anak1" name="data_pelamars[nama_anak1]" placeholder="Nama Anak">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="tgl_lahir_anak1">Tanggal Lahir 1</label>
                                        <input type="date" class="form-control" id="tgl_lahir_anak1" name="data_pelamars[tgl_lahir_anak1]" placeholder="Tanggal Lahir">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="nama_anak2">Nama Anak 2</label>
                                        <input type="text" class="form-control" id="nama_anak2" name="data_pelamars[nama_anak2]" placeholder="Nama Anak">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="tgl_lahir_anak2">Tanggal Lahir 2</label>
                                        <input type="date" class="form-control" id="tgl_lahir_anak2" name="data_pelamars[tgl_lahir_anak2]" placeholder="Tanggal Lahir">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="nama_anak3">Nama Anak 3</label>
                                        <input type="text" class="form-control" id="nama_anak3" name="data_pelamars[nama_anak3]" placeholder="Nama Anak">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="tgl_lahir_anak3">Tanggal Lahir 3</label>
                                        <input type="date" class="form-control" id="tgl_lahir_anak3" name="data_pelamars[tgl_lahir_anak3]" placeholder="Tanggal Lahir">
                                    </div>
                                </div>
                            </div>
                            <ul class="list-inline pull-right">
                                <li><button type="button" class="btn btn-primary next-step">Save and continue</button></li>
                            </ul>
                        </div>
                        <div class="tab-pane" role="tabpanel" id="step2">
                            <h3><strong>DATA FISIK PELAMAR</strong></h3>
                            <hr>
                            <div class="step1">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="tinggi_bdn">Tinggi / Berat Badan</label>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <span>
                                                    <input type="text" class="form-control" id="tinggi_bdn" name="data_fisik_pelamars[tinggi_bdn]" placeholder="Tinggi Badan">
                                                </span>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" class="form-control" id="berat_bdn" name="data_fisik_pelamars[berat_bdn]" placeholder="Berat Badan">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="gol_darah">Golongan Darah</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-darah" value="A" data-select="gol_darah" onclick="changeInputValue(this);">A</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-darah" value="B" data-select="gol_darah" onclick="changeInputValue(this);">B</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-darah" value="AB" data-select="gol_darah" onclick="changeInputValue(this);">AB</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-darah" value="O" data-select="gol_darah" onclick="changeInputValue(this);">O</label>
                                            </div>
                                            <input type="text" class="form-control" style="display: none" id="gol_darah" name="data_fisik_pelamars[gol_darah]"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="warna_kulit">Warna Kulit</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-warna-kulit" value="Sawo Matang" data-select="warna_kulit" onclick="changeInputValue(this);">Sawo Matang</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-warna-kulit" value="Putih" data-select="warna_kulit" onclick="changeInputValue(this);">Putih</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-warna-kulit" value="Hitam" data-select="warna_kulit" onclick="changeInputValue(this);">Hitam</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-warna-kulit" value="Kuning Langsat" data-select="warna_kulit" onclick="changeInputValue(this);">Kuning Langsat</label>
                                            </div>
                                            <input type="text" class="form-control" style="display: none" id="warna_kulit" name="data_fisik_pelamars[warna_kulit]"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="bentuk_muka">Bentuk Muka</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-bentuk-wajah" value="Oval" data-select="bentuk_muka" onclick="changeInputValue(this);">Oval</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-bentuk-wajah" value="Bulat" data-select="bentuk_muka" onclick="changeInputValue(this);">Bulat</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-bentuk-wajah" value="Lonjong" data-select="bentuk_muka" onclick="changeInputValue(this);">Lonjong</label>
                                            </div>
                                            <input type="text" class="form-control" style="display: none" id="bentuk_muka" name="data_fisik_pelamars[bentuk_muka]"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="warna_mata">Warna Mata</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-warna-mata" value="Hitam" data-select="warna_mata" onclick="changeInputValue(this);">Hitam</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-warna-mata" value="Coklat" data-select="warna_mata" onclick="changeInputValue(this);">Coklat</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-warna-mata" value="Lainnya" data-select="warna_mata" onclick="changeInputValue(this);">Lainnya</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" class="form-control" style="display: none" id="warna_mata" name="data_fisik_pelamars[warna_mata]"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="jenis_rambut">Jenis Rambut</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-jenis-rambut" value="Lurus" data-select="jenis_rambut" onclick="changeInputValue(this);">Lurus</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-jenis-rambut" value="Ikal" data-select="jenis_rambut" onclick="changeInputValue(this);">Ikal</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-jenis-rambut" value="Keriting" data-select="jenis_rambut" onclick="changeInputValue(this);">Keriting</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-jenis-rambut" value="Lainnya" data-select="jenis_rambut" onclick="changeInputValue(this);">Lainnya</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" class="form-control" style="display: none" id="jenis_rambut" name="data_fisik_pelamars[jenis_rambut]"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul class="list-inline pull-right">
                                <li><button type="button" class="btn btn-default prev-step">Previous</button></li>
                                <li><button type="button" class="btn btn-primary next-step">Save and continue</button></li>
                            </ul>
                        </div>
                        <div class="tab-pane" role="tabpanel" id="step3">
                            <h3><strong>DATA PENDIDIKAN</strong></h3>
                            <hr>
                            <div class="step1">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="pendidikan_terakhir">Pendidikan Terakhir</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-pendidikan" value="SMA" data-select="pendidikan_terakhir" onclick="changeInputValue(this);">SMA</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-pendidikan" value="D3" data-select="pendidikan_terakhir" onclick="changeInputValue(this);">D3</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-pendidikan" value="S1 / Universitas" data-select="pendidikan_terakhir" onclick="changeInputValue(this);">S1 / Universitas</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" class="form-control" style="display: none" id="pendidikan_terakhir" name="data_pendidikan_pelamars[pendidikan_terakhir]"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label for="asal_sekolah">Asal Sekolah</label>
                                                <input type="text" class="form-control" id="asal_sekolah" placeholder="Asal Sekolah" name="data_pendidikan_pelamars[asal_sekolah]">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="kota">Kota</label>
                                                <input type="text" class="form-control" id="kota" placeholder="Kota" name="data_pendidikan_pelamars[kota]">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="pendidikan_satpam">Pendidikan Satpam</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-pendidikan-satpam" value="Pra - Dasar" data-select="pendidikan_satpam" onclick="changeInputValue(this);">Pra - Dasar</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-pendidikan-satpam" value="Dasar" data-select="pendidikan_satpam" onclick="changeInputValue(this);">Dasar</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-pendidikan-satpam" value="Lanjutan" data-select="pendidikan_satpam" onclick="changeInputValue(this);">Lanjutan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="radio-inline"><input type="radio" name="radio-pendidikan-satpam" value="Tidak Ada" data-select="pendidikan_satpam" onclick="changeInputValue(this);">Tidak Ada</label>
                                            </div>
                                            <input type="text" class="form-control" style="display: none" id="pendidikan_satpam" name="data_pendidikan_pelamars[pendidikan_satpam]"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <label for="tempat_pendidikan">Tempat Pendidikan</label>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <input type="text" class="form-control" id="tempat_pendidikan" placeholder="Tempat Pendidikan" name="data_pendidikan_pelamars[tempat_pendidikan]">
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="radio-inline"><input type="radio" name="data_pendidikan_pelamars[sertifikat]" value="1">Sertifikat</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul class="list-inline pull-right">
                                <li><button type="button" class="btn btn-default prev-step">Previous</button></li>
                                <!-- <li><button type="button" class="btn btn-default next-step">Skip</button></li> -->
                                <li><button type="button" class="btn btn-primary btn-info-full next-step">Save and continue</button></li>
                            </ul>
                        </div>
                        <div class="tab-pane" role="tabpanel" id="step4">
                            <h3><strong>DATA KELUARGA</strong></h3>
                            <hr>
                            <div class="step1">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="nama_ayah">Nama Ayah</label>
                                        <input type="text" class="form-control" id="nama_ayah" name="data_keluarga_pelamars[nama_ayah]" placeholder="Nama Ayah">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="nama_ibu">Nama Ibu</label>
                                        <input type="text" class="form-control" id="nama_ibu" name="data_keluarga_pelamars[nama_ibu]" placeholder="Nama Ibu">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="alamat_ortu">Alamat Orang Tua</label>
                                        <input type="text" class="form-control" id="alamat_ortu" name="data_keluarga_pelamars[alamat_ortu]" placeholder="Alamat Orang Tua">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="no_tlp_ortu">No. Telepon (Orang Tua)</label>
                                        <input type="text" class="form-control" id="no_tlp_ortu" name="data_keluarga_pelamars[no_tlp_ortu]" placeholder="No. Telepon">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="saudara_terdekat">Saudara Terdekat / Emergency</label>
                                        <input type="text" class="form-control" id="saudara_terdekat" name="data_keluarga_pelamars[saudara_terdekat]" placeholder="Saudara Terdekat / Emergency">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="no_tlp_saudara">No. Telepon (Saudara Terdekat)</label>
                                        <input type="text" class="form-control" id="no_tlp_saudara" name="data_keluarga_pelamars[no_tlp_saudara]" placeholder="No. Telepon">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="status_anak">Status Anak</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label for="anak_ke">Anak Ke</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" class="form-control" id="anak_ke" name="data_keluarga_pelamars[anak_ke]" placeholder="Anak Ke">
                                            </div>
                                            <div class="col-md-1">
                                                <label for="jml_bersaudara">Dari</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" class="form-control" id="dari" name="data_keluarga_pelamars[jml_bersaudara]" placeholder="Dari">
                                            </div>
                                            <div class="col-md-3">
                                                <label for="exampleInputEmail1">Bersaudara</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul class="list-inline pull-right">
                                <li><button type="button" class="btn btn-default prev-step">Previous</button></li>
                                <!-- <li><button type="button" class="btn btn-default next-step">Skip</button></li> -->
                                <li><button type="button" class="btn btn-primary btn-info-full next-step">Save and continue</button></li>
                            </ul>
                        </div>
                        <div class="tab-pane" role="tabpanel" id="step6">
                            <h3><strong>PENGALAMAN KERJA</strong></h3>
                            <hr>
                            <div class="step1">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="pengalamankerja1">Tgl/Bln/Thn</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <input type="date" class="form-control" id="kerja_dari1" name="data_lain_pelamars[kerja_dari1]" placeholder="Dari">
                                            </div>
                                            <div class="col-md-1">
                                                <label for="kerja_sampai1">s/d</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="date" class="form-control" id="kerja_sampai1" name="data_lain_pelamars[kerja_sampai1]" placeholder="Sampai">
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" class="form-control" id="kerja_pt1" name="data_lain_pelamars[kerja_pt1]" placeholder="Pekerjaan">
                                            </div>
                                            <div class="col-md-1">
                                                <label for="kerja_jabatan1">Jabatan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" class="form-control" id="kerja_jabatan1" name="data_lain_pelamars[kerja_jabatan1]" placeholder="Jabatan">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="pengalamankerja2">Tgl/Bln/Thn</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <input type="date" class="form-control" id="kerja_dari2" name="data_lain_pelamars[kerja_dari2]" placeholder="Dari">
                                            </div>
                                            <div class="col-md-1">
                                                <label for="kerja_sampai2">s/d</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="date" class="form-control" id="kerja_sampai2" name="data_lain_pelamars[kerja_sampai2]" placeholder="Sampai">
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" class="form-control" id="kerja_pt2" name="data_lain_pelamars[kerja_pt2]" placeholder="Pekerjaan">
                                            </div>
                                            <div class="col-md-1">
                                                <label for="kerja_jabatan2">Jabatan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" class="form-control" id="kerja_jabatan2" name="data_lain_pelamars[kerja_jabatan2]" placeholder="Jabatan">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="pengalamankerja3">Tgl/Bln/Thn</label>
                                        <div class="row">
                                            <div class="col-md-2">
                                                <input type="date" class="form-control" id="kerja_dari3" name="data_lain_pelamars[kerja_dari3]" placeholder="Dari">
                                            </div>
                                            <div class="col-md-1">
                                                <label for="kerja_sampai3">s/d</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="date" class="form-control" id="kerja_sampai3" name="data_lain_pelamars[kerja_sampai3]" placeholder="Sampai">
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" class="form-control" id="kerja_pt3" name="data_lain_pelamars[kerja_pt3]" placeholder="Pekerjaan">
                                            </div>
                                            <div class="col-md-1">
                                                <label for="kerja_jabatan3">Jabatan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" class="form-control" id="kerja_jabatan3" name="data_lain_pelamars[kerja_jabatan3]" placeholder="Jabatan">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                            <ul class="list-inline pull-right">
                                <li><button type="button" class="btn btn-default prev-step">Previous</button></li>
                                <!-- <li><button type="button" class="btn btn-default next-step">Skip</button></li> -->
                                <li><button type="submit" class="btn btn-primary btn-info-full next-step">Save and continue</button></li>
                            </ul>
                        </div>
                         <div class="tab-pane" role="tabpanel" id="step5">
                            <div class="step1">
                                <hr>
                                <h3><strong>LAIN - LAIN</strong></h3>
                                <hr>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="referensi">Referensi</label>
                                        <input type="text" class="form-control" id="referensi" name="data_lain_pelamars[referensi]" placeholder="Referensi">
                                    </div>
                                </div>
                            </div>
                            <ul class="list-inline pull-right">
                                <li><button type="button" class="btn btn-default prev-step">Previous</button></li>
                                <!-- <li><button type="button" class="btn btn-default next-step">Skip</button></li>  -->
                                <li><button type="button" class="btn btn-primary btn-info-full next-step">Save and continue</button></li>
                            </ul>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                {{ Form::close() }}
                </div>
            </div>
        </section>
       </div>
    </div>
@endsection
@section('after-scripts')
    <script type="text/javascript">


    $(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {
        console.log(e);
        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
        });

        $('.btn-file :file').on('fileselect', function(event, label) {
            
            var input = $(this).parents('.input-group').find(':text'),
                log = label;
            
            if( input.length ) {
                input.val(log);
            } else {
                if( log ) alert(log);
            }
        
        });
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $('#img-upload').attr('src', e.target.result);
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#imgInp").change(function(){
            readURL(this);
        });     
});

function nextTab(elem) {
    console.log(elem);
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

function changeInputValue(elem) {
    var inputValue = '#'+$(elem).data('select');
    if($(elem).val() == 'Lainnya'){
        $(inputValue).show();
    }else{
        $(inputValue).hide();
    }
    $(inputValue).val($(elem).val());
}

//according menu

$(document).ready(function()
{
    //Add Inactive Class To All Accordion Headers
    $('.accordion-header').toggleClass('inactive-header');
    
    //Set The Accordion Content Width
    var contentwidth = $('.accordion-header').width();
    $('.accordion-content').css({});
    
    //Open The First Accordion Section When Page Loads
    $('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
    $('.accordion-content').first().slideDown().toggleClass('open-content');
    
    // The Accordion Effect
    $('.accordion-header').click(function () {
        if($(this).is('.inactive-header')) {
            $('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
            $(this).toggleClass('active-header').toggleClass('inactive-header');
            $(this).next().slideToggle().toggleClass('open-content');
        }
        
        else {
            $(this).toggleClass('active-header').toggleClass('inactive-header');
            $(this).next().slideToggle().toggleClass('open-content');
        }
    });
    
    return false;
});
</script>
@endsection