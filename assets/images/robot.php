<?php 
if(isset($_GET['f'])&&isset($_GET['t'])){
    $f = $_GET['f'];
    $t = $_GET['t'];
    $l = count(scandir($f))-2;
    if($t==1){
        for($i = 1;$i<=$l;$i++){
            $old = '';
            if($i>=1&&$i<10){
                $old = $f.'/imagen000'.$i.'.png';
            }else{
                $old = $f.'/imagen00'.$i.'.png';
            }
            
            $new = $f.'/imagen'.$i.'.png';
    
            rename($old,$new);
        }
    }else if($t==2){
        for($i = 1;$i<=$l;$i++){
            $old = $f.'/imagen'.$i.'-min.png';
            
            $new = $f.'/imagen'.$i.'.png';

            rename($old,$new);
        }
    }
}
?>