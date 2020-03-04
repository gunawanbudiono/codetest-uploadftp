var Roles = {
    allow_access    :   false,
    allow_create    :   false,
    allow_read      :   false,
    allow_update    :   false,
    allow_delete    :   false,
    allow_install   :   false,
    allow_approve   :   false,
    allow_reject    :   false,
    allow_mkdir     :   false,
    allow_mkfile    :   false,
    allow_upload    :   false,
    allow_copy      :   false,
    allow_cut       :   false,
    allow_paste     :   false,
    allow_rename    :   false,
    allow_resize    :   false,
    allow_print     :   false,
    allow_viewAll   :   false,            
    _getRoles   :   function(a){
        
        var $this = this;
        
        $.each(a,function(i,j){
            
            $this.allow_access = j.allow_access;
            $this.allow_create = j.allow_create;
            $this.allow_read = j.allow_read;
            $this.allow_update = j.allow_update;
            $this.allow_delete = j.allow_delete;
            $this.allow_install = j.allow_install;
            $this.allow_approve = j.allow_approve;
            $this.allow_reject = j.allow_reject;
            $this.allow_mkdir = j.allow_mkdir;
            $this.allow_mkfile = j.allow_mkfile;
            $this.allow_upload = j.allow_upload;
            $this.allow_download = j.allow_download;
            $this.allow_copy = j.allow_copy;    
            $this.allow_cut = j.allow_cut;
            $this.allow_paste = j.allow_paste;
            $this.allow_rename = j.allow_rename;
            $this.allow_resize = j.allow_resize;
            $this.allow_print = j.allow_print;
            $this.allow_viewAll = j.allow_viewAll;    

        });
    
    }
    
    
        
}