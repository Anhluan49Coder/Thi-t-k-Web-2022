function capnhat(){
    var sum=0;
    //xử lí tính thành tiền cho từng dòng,tính tổng tiền giỏ hàng
    $('.sp').each(function(index,tr){
        // chuyển đối tượng tr thành jquery
        tr=$(tr);
        //Lấy ô số lượng
        var sl=tr.find('.sl input').val();
        //Lấy ô đơn giá
        var gia=tr.find('.gia');
        gia.html(gia.data('value').toLocaleString('vi',{style:'currency',currency:'VND'}));
        //Xuất giá trị ra ô đơn giá
        gia=gia.data('value');
        //Tính thành tiền
        var tt=sl*gia;
        //Xuất thành tiền vào 
        tr.find('.tt').html((sl*gia).toLocaleString('vi',{style:'currency',currency:'VND'}));
        //Tính ô tổng tiền
        sum+=sl*gia;
    });
    //Xuất tính tong các đơn hàng
    $('#tong').html(sum.toLocaleString('vi',{style:'currency',currency:'VND'}));
}
$(function(){
    capnhat();
    //Gán hàm sử lý sự kiện thay đổi số lượng gán vào giỏ hàng nhưng lọc lại các sự kiện selector input
    $('#giohang').on('input','#sl',function(event){
        //Đối tượng this là đối tượng phát sinh sự kiện(evnet.target)
        var input=$(this);
        var sl=input.val();
        //Lấy dòng chứa input ra cập nhật
        var tr=input.closest('.sp');
        var ten=tr.find('.ten').text();
        if(sl<=0){
            //Hỏi muón xóa khi đưa mặt hàng về 0 hay không
            var xoa=confirm('Bạn có muốn xóa sản phẩm'+ten+' luôn hay không?')
            if(xoa)
            {
                tr.remove();
            }
            else{
                //Nếu không trả về số lượng là 1
                input.val(1);
            }
        }
        if(sl>=99){
            var xoa=alert('Bạn đã chọn số lượng '+ten+' đến mức tối đa!')
        }
        capnhat();
    });
    //gán hàm sự kiện nút xóa
    $('#giohang').on('click','.btn-xoa',function(event){
        //lấy dòng chứa nút bấm
        var tr=$(this).closest('.sp');
        var ten=tr.find('.ten').text();
        var xoa=confirm('Bạn có muốn xóa sản phẩm'+ten+' luôn hay không?')
            if(xoa)
            {
                tr.remove();
                capnhat();
            }
    });
});