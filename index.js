//index.js
//获取应用实例
let infoData = [{
    check : 1,
    title : '菲律宾进口可尼斯泰迪多口味棉花糖菲律宾进口可尼斯泰迪多口味棉花糖 70g',
    time : '2018-6-29'
},{
    check : 0,
    title : '菲律宾进口可尼斯泰迪多口味棉花糖菲律宾进口迪多口味棉花糖 70g',
    time : '2018-6-29'
},{
    check : 0,
    title : '菲律宾进口可尼斯泰迪多口味棉花糖菲律宾进花糖  70g',
    time : '2018-6-29'
},{
    check : 0,
    title : '菲律宾进口可味棉花糖菲律宾进口可尼斯泰迪多口味棉花糖 70g',
    time : '2018-6-29'
}]
Page({
    data: {
        infoData : infoData,  //模拟数据
        startX : 0,
        moveX : 0,
        btnMoveX : 80,  //初始值
        classIndex : null,  //设置当前class
        activeIndex : null //当前触碰的索引
    },
    delFn(e){//删除例子
        wx.showModal({
            content: '确定删除吗？',
            success: res =>{
                if (res.confirm) {
                    //初始化
                    this.setData({
                        classIndex : e.target.dataset.index,
                        activeIndex : null,
                        moveX : 0,
                        btnMoveX : 80
                    });
                    //执行删除
                    infoData.splice(e.target.dataset.index, 1);
                    this.setData({
                        infoData : infoData
                    });
                };
            }
        })
    },
    checkFn(e){ //checkBox例子
        let _check = this.data.infoData[e.target.dataset.index].check
        this.setData({
            ["infoData["+e.target.dataset.index+"].check"] : !_check
        })
    },
    startFn(e){ //按下
        this.setData({
            classIndex : e.target.dataset.index,
            startX : e.touches[0].pageX
        });
        if(e.target.dataset.index != this.data.activeIndex){
            this.setData({
                moveX : 0,
                btnMoveX : 80,  
                activeIndex : e.target.dataset.index
            });
        };
        return false;
    },
    moveFn(e){ //移动
        if(e.touches[0].pageX - this.data.startX >= 0){ //向右滑动
            if(this.data.moveX <= -80) { //向右关闭
                this.setData({
                    classIndex : null,
                    moveX : 0,
                    btnMoveX : 80
                });
            }
            return
        };
        if(this.data.moveX <= -80) return;
        let num = e.touches[0].pageX - this.data.startX,
            btnNum = 80 + num;
        this.setData({
            moveX : (num <= -80 ? -80 : num) ,
            btnMoveX : (btnNum <=0 ? 0 : btnNum)
        });
    },
    endFn(e){ //抬起
        if(this.data.btnMoveX != 0){  //没有达到固定值，初始化
            this.setData({
                classIndex : null,
                activeIndex : null,
                moveX : 0,
                btnMoveX : 80
            });
        };
    }
})
