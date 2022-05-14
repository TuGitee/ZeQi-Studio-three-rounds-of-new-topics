window.addEventListener('load', function () {
    // 定义移动的动画
    function move(obj, position, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (position - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == position) {
                clearInterval(obj.timer);
                fn && fn();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 10);
    }
    // 轮播图效果
    var box = document.querySelector('.middle-images');
    var imgs = document.querySelector('.imgs-box');
    var icons = document.querySelector('.icons-box');
    var num = 0;
    var circle = 0;
    var timer = setInterval(function () {
        right();
    }, 4000);
    box.addEventListener('mouseenter', function () {
        clearInterval(timer);
    })
    box.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            right();
        }, 4000);
    })
    function left() {
        if (num == 0) {
            num = imgs.children.length;
        }
        num--;
        move(imgs, -num * imgs.children[0].offsetWidth);
        circle--;
        if (circle == -1) {
            circle = icons.children.length - 1;
        }
        circleChange();
    }
    function right() {
        if (num >= imgs.children.length - 1) {
            num = -1;
        }
        num++;
        move(imgs, -num * imgs.children[0].offsetWidth);
        circle++;
        if (circle == icons.children.length) {
            circle = 0;
        }
        circleChange();
    }
    function circleChange() {
        for (var i = 0; i < icons.children.length; i++) {
            icons.children[i].className = '';
        }
        icons.children[circle].className = 'current';
    }
    
    imgs.addEventListener('mousedown', function (e) {
        var x = e.pageX - imgs.offsetLeft;
        var position = e.pageX;
        var time1 = +new Date();
        document.addEventListener('mousemove', fn);
        function fn(e) {
            if (num == imgs.children.length - 1 && e.pageX - position < 0) {
                imgs.style.left = e.pageX - x - (e.pageX - position) * 2 / 3 + 'px';
            }
            else if (num == 0 && e.pageX - position > 0) {
                imgs.style.left = (e.pageX - x) / 3 + 'px';
            }
            else {
                imgs.style.left = e.pageX - x + 'px';
            }
        }
        //移除事件防止重复触发
        document.onmouseup=null;
        document.onmouseup=function (e) {
            var time2 = +new Date();
            if (time2 - time1 < 500 || Math.abs(position - e.pageX) > box.offsetWidth / 2) {
                if (position > e.pageX && num < imgs.children.length - 1) {
                    right();
                }
                else if (e.pageX > position && num != 0) {
                    left();
                }
                else {
                    move(imgs, -num * imgs.children[0].offsetWidth);
                }
            } else {
                move(imgs, -num * imgs.children[0].offsetWidth);
            }
            document.removeEventListener('mousemove', fn);
        }

    })
    for (var i = 0; i < imgs.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        li.innerHTML = '.';
        icons.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < icons.children.length; i++) {
                icons.children[i].className = '';
            }
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            this.className = 'current';
            move(imgs, -imgs.children[0].offsetWidth * index);
        })
    }
    icons.children[0].className = 'current';
    
    

    // 定义右边的导航栏
    var rightNavBar = document.querySelector('.right-nav-bar-list');
    document.addEventListener('scroll', function () {
        if (window.pageYOffset > 250) {
            rightNavBar.style.display = 'block';
        } else {
            rightNavBar.style.display = 'none';
        }
    })

    // 定义两个搜索下拉菜单
    var middleSearchTitle = document.querySelector('.middle-search-title');
    var middleSearchList = document.querySelector('.middle-search-list');
    var middleSearchIcon = document.querySelector('.middle-search-title-icon');
    var middleListFlag = true;
    var headSearchFlag = true;
    var headSearchTitle = document.querySelector('.head-search-icon');
    var headSearchIcon = document.querySelector('.head-search-icon-icon');
    var headSearchList = document.querySelector('.head-search-list');
    middleSearchTitle.addEventListener('click', function (e) {
        //flag是true的时候展现出来
        if (!headSearchFlag) {
            headSearchTitle.click();
        }
        if (middleListFlag) {
            middleSearchList.style.display = 'block';
            middleListFlag = false;
            middleSearchIcon.style.animation = 'circle 0.3s forwards';
        } else {
            middleListFlag = true;
            middleSearchList.style.display = 'none';
            middleSearchIcon.style.animation = 'circle-reverse 0.3s forwards';
        }
        e.stopPropagation();
    })
    headSearchTitle.addEventListener('click', function (e) {
        //flag是true的时候展现出来
        if (!middleListFlag) {
            middleSearchTitle.click();
        }
        if (headSearchFlag) {
            headSearchList.style.display = 'block';
            headSearchFlag = false;
            headSearchIcon.style.animation = 'circle 0.3s forwards';
        } else {
            headSearchFlag = true;
            headSearchList.style.display = 'none';
            headSearchIcon.style.animation = 'circle-reverse 0.3s forwards';
        }
        e.stopPropagation();
    })
    window.addEventListener('click', function () {
        if (!headSearchFlag) {
            headSearchTitle.click();
        }
        if (!middleListFlag) {
            middleSearchTitle.click();
        }
    })
    var middlePlaceholderNum = ['20,029,112', '', ''];
    var middleSearchPlaceholder = document.querySelector('.middle-search-placeholder');
    //初始化
    middleSearchPlaceholder.children[1].innerHTML = middlePlaceholderNum[0];
    //添加事件
    for (let i = 0; i < middleSearchList.children.length; i++) {
        middleSearchList.children[i].addEventListener('click', function () {
            middleSearchTitle.children[0].innerHTML = this.innerText;
            middleSearchPlaceholder.children[0].innerHTML = '搜索' + this.innerText;
            middleSearchPlaceholder.children[1].innerHTML = middlePlaceholderNum[this.getAttribute('data-index')];
        })
    }
    for (var i = 0; i < headSearchList.children.length; i++) {
        headSearchList.children[i].addEventListener('click', function () {
            headSearchTitle.children[0].innerHTML = this.innerText;
            for (var i = 0; i < headSearchList.children.length; i++) {
                headSearchList.children[i].className = '';
            }
            this.className = 'head-list-current';
        })
    }

    // 顶部下拉菜单
    var headNavItems = document.querySelectorAll('.head-nav-item');
    for (var i = 0; i < headNavItems.length; i++) {
        headNavItems[i].addEventListener('mouseover', function () {
            for (var j = 0; j < headNavItems.length; j++) {
                if (headNavItems[j].children[1] != undefined) {
                    headNavItems[j].children[1].style.display = 'none';
                }
            }
            if (this.children[1] != undefined) {
                this.children[1].style.display = 'block';
            }
            this.addEventListener('mouseout', function () {
                for (let j = 0; j < headNavItems.length; j++) {
                    if (headNavItems[j].children[1] != undefined) {
                        headNavItems[j].children[1].style.display = 'none';
                    }
                }
            })
        })
    }
    var headMenuItems = document.querySelectorAll('.head-list-item');
    for (var i = 0; i < headMenuItems.length; i++) {
        headMenuItems[i].addEventListener('mouseover', function () {
            for (var j = 0; j < headMenuItems.length; j++) {
                if (headMenuItems[j].children[1] != undefined) {
                    headMenuItems[j].children[1].style.display = 'none';
                }
            }
            if (this.children[1] != undefined) {
                this.children[1].style.display = 'block';
            }
            this.addEventListener('mouseout', function () {
                for (let j = 0; j < headMenuItems.length; j++) {
                    if (headMenuItems[j].children[1] != undefined) {
                        headMenuItems[j].children[1].style.display = 'none';
                    }
                }
            })
        })
    }


    // 中间的字
    var middleSearchContent = document.querySelector('.middle-search-content');
    var middleSearchPlaceholder = document.querySelector('.middle-search-placeholder');
    middleSearchContent.addEventListener('focus', function () {
        middleSearchPlaceholder.style.opacity = '0';
        middleSearchContent.addEventListener('blur', function () {
            if (middleSearchContent.value == '') {
                middleSearchPlaceholder.style.opacity = '1';
            } else {
                middleSearchPlaceholder.style.opacity = '0';
            }
        })
    })

    // 下面的切换
    // 精灵图填充 保存相关信息
    var nameList = ["小羊快跑ya", "未必然", "米粒designer", "木乀", "QHUI工作站", "冬眠的猪猪", "颂诵", "亮黎", "亮黎", "颂诵", "颂诵", "Xian包子"];
    var avatarList = [];
    for (var i = 0; i < 12; i++) {
        avatarList[i] = "images/" + (i + 1) + ".jpg";
    }
    var bottomTabItems = document.querySelectorAll('.bottom-tab-item');
    var bottomContentList = this.document.querySelector('.bottom-content-list');
    var strs = '';
    for (var i = 0; i < 3; i++) {
        strs = '';
        for (var j = 0; j < 15; j++) {
            strs += '<div style="background: url(images/' + 1 + '-' + (i % 3 + 1) + '.png) no-repeat ' + (15 - 57 * (j % 5)) + 'px ' + (20 - 65 * Math.floor(j / 5)) + 'px; background-size: 260px;"> </div>';
        }
        getNewBottomListItem(nameList, avatarList, i, bottomContentList);
    }
    for (var i = 0; i < bottomTabItems.length; i++) {
        bottomTabItems[i].addEventListener('mouseenter', function () {
            for (var i = 0; i < bottomTabItems.length; i++) {
                bottomTabItems[i].className = "bottom-tab-item";
                // bottomContentItems[i].className = "bottom-content-item";
            }
            this.className = "bottom-tab-item bottom-tab-current";
            // bottomContentItems[this.getAttribute('data-index')].className = "bottom-content-item bottom-content-current";
            var index = Number(this.getAttribute('data-index'));
            bottomContentList.innerHTML = '';
            for (var i = 0; i < 3; i++) {
                strs = '';
                if (index == 0) {
                    for (var j = 0; j < 15; j++) {
                        strs += '<div style="background: url(images/' + (index + 1) + '-' + (i % 3 + 1) + '.png) no-repeat ' + (15 - 57 * (j % 5)) + 'px ' + (20 - 65 * Math.floor(j / 5)) + 'px; background-size: 260px;"> </div>';
                    }
                    getNewBottomListItem(nameList, avatarList, index * 3 + i, bottomContentList);
                }
                else {
                    for (var j = 0; j < 6; j++) {
                        strs += '<div style="background: url(images/' + (index + 1) + '-' + (i % 3 + 1) + '.png) no-repeat ' + (15 - 96 * (j % 3)) + 'px ' + (20 - 115 * Math.floor(j / 3)) + 'px; background-size: 260px;"> </div>';
                    }
                    getNewBottomListItem(nameList, avatarList, index * 3 + i, bottomContentList);
                }
            }
        })
    }

    // for (var i = 0; i < 4; i++) {
    //     for (var m = 0; m < 3; m++) {
    //         var strs = '';
    //         for (var j = 0; j < 3; j++) {
    //             for (var k = 0; k < 5; k++) {
    //                 // var newBottomItemIcon = document.createElement('div');
    //                 // bottomItemIcons[i].children[5*j+k].style.background="url(images/"+(Math.floor(i/3)+1)+"-"+(i%3+1)+".png) "+"no-repeat "+(15-57*k)+"px "+(20-65*j)+"px";
    //                 // bottomItemIcons[i].children[5*j+k].style.backgroundSize="254px";
    //                 // newBottomItemIcon.style.background = "url(images/" + (Math.floor(i / 3) + 1) + "-" + (i % 3 + 1) + ".png) " + "no-repeat " + (15 - 57 * k) + "px " + (20 - 65 * j) + "px";
    //                 // newBottomItemIcon.style.backgroundSize = "254px";
    //                 strs += '<div style="background: url(images/' + (i+1) + '-' + (m+1) + '.png) no-repeat ' + (15 - 57 * k) + 'px ' + (20 - 65 * j) + 'px; background-size: 254px;"> </div>';
    //             }
    //         }
    //         var newBottomListItem = document.createElement('div');
    //         newBottomListItem.className = 'bottom-list-item';
    //         newBottomListItem.innerHTML = '<div class="bottom-item-title"><div class="bottom-title-image"><img src="' + avatarList[3*i+m] + '"></div><div class="bottom-title-name">' + nameList[3*i+m] + '</div></div><div class="bottom-item-icons">' + strs + '</div>';
    //         bottomContentList[i].appendChild(newBottomListItem);
    //     }
    // }

    // 时间复杂度n的四次方，运行速度慢，优化算法

    function getNewBottomListItem(nameList, avatarList, index, bottomContentList) {
        var newBottomListItem = document.createElement('div');
        newBottomListItem.className = 'bottom-list-item';
        newBottomListItem.innerHTML = '<div class="bottom-item-title"><div class="bottom-title-image"><img src="' + avatarList[index] + '"></div><div class="bottom-title-name">' + nameList[index] + '</div></div><div class="bottom-item-icons-' + Number(index < 3) + '">' + strs + '</div>';
        // bottomContentList[Math.floor(index / 3)].appendChild(newBottomListItem);
        bottomContentList.appendChild(newBottomListItem);
    }

    // 考虑动态生成即上文
    // for (var i = 0; i < bottomContentList.length * 3; i++) {
    //     var strs = '';
    //     if (i < 3) {
    //         for (var j = 0; j < 15; j++) {
    //             strs += '<div style="background: url(images/' + (Math.floor(i / 3) + 1) + '-' + (i % 3 + 1) + '.png) no-repeat ' + (15 - 57 * (j % 5)) + 'px ' + (20 - 65 * Math.floor(j / 5)) + 'px; background-size: 260px;"> </div>';
    //         }
    //         getNewBottomListItem(nameList, avatarList, i, bottomContentList);
    //     }
    //     else {
    //         for (var j = 0; j < 6; j++) {
    //             strs += '<div style="background: url(images/' + (Math.floor(i / 3) + 1) + '-' + (i % 3 + 1) + '.png) no-repeat ' + (15 - 96 * (j % 3)) + 'px ' + (20 - 115 * Math.floor(j / 3)) + 'px; background-size: 260px;"> </div>';
    //         }
    //         getNewBottomListItem(nameList, avatarList, i, bottomContentList);
    //     }
    // }

    // 购物车页面
    var rightShoppingArrow = document.querySelector('.right-shopping-arrow');
    var rightShopping = document.querySelector('.right-shopping');
    var bodyCover = document.querySelector('.body-cover');
    var shoppings = document.querySelectorAll('.shopping');
    var body = document.querySelector('body');

    // 用于记录shopping是否存在的指标
    var shoppingFlag = true;
    for (var i = 0; i < shoppings.length; i++) {
        shoppings[i].addEventListener('click', function () {
            shoppingFlag = false;
            move(rightShopping, document.body.clientWidth - rightShopping.clientWidth);
            bodyCover.style.display = 'block';
            body.style.overflow = 'hidden';
        })
    }
    rightShoppingArrow.addEventListener('click', function () {
        shoppingFlag = true;
        move(rightShopping, document.body.clientWidth);
        bodyCover.style.display = 'none';
        body.style.overflow = 'overlay';
    })
    bodyCover.addEventListener('click', function () {
        shoppingFlag = true;
        move(rightShopping, document.body.clientWidth);
        bodyCover.style.display = 'none';
        body.style.overflow = 'overlay';
    })
    this.addEventListener('resize', function () {
        if (!shoppingFlag) {
            rightShopping.style.left = document.body.clientWidth - rightShopping.clientWidth + 'px';
        }
    })

    // 置顶
    var toHead = document.querySelector('#to-head');
    // var toHeadTime = 10000;
    // var toHeadLength= 0;
    toHead.addEventListener('click', function () {
        // toHeadLength=window.pageYOffset;
        // clearInterval(window.timer);//防止反复调用
        // window.timer = setInterval(function () {
        //     var step = (0 - window.pageYOffset) / 10;
        //     step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //     if (window.pageYOffset == 0) {
        //         clearInterval(window.timer);
        //     }
        //     window.scroll(0, window.pageYOffset + step);
        // }, toHeadTime/toHeadLength);
        // 继续向下滚动 他还要往上走
        // 发现了一个方法解决了上面的问题
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })


    //绘制星空图
    function straightLine(ctx, fromX, fromY, toX, toY, color, width) {
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.closePath();
    }
    var stars = document.querySelectorAll('canvas')[0];
    var meteor = document.querySelectorAll('canvas')[1];
    var ctxStars = stars.getContext('2d');
    var ctxMeteor = meteor.getContext('2d');
    stars.width = meteor.width = document.body.offsetWidth - 1;
    stars.height = meteor.height = 675;
    var height = stars.height;
    var width = stars.width;
    var star = 100;
    var starList = [];
    function newStar(fromX, fromY) {
        //如果传递参数就用第一个，反之随机生成
        var x = fromX || Math.random() * width;
        var y = fromY || Math.random() * height;
        var move = Math.random() / 10;
        var starItem = { x, y, move };
        return starItem;
    }
    function newMeteor() {
        var x = Math.random() * width / 2 + width / 2;
        var y = 0;
        var height = Math.random() * 6;//高度在0-6之间
        var speed = Math.random() + 0.5;//速度在0.5-1.5之间
        var angle = Math.ceil(Math.random() * 3) + 7;//角度范围7-9
        var meteorItem = { x, y, height, speed, angle };
        return meteorItem;
    }
    for (var i = 0; i < star; i++) {
        starList[i] = newStar();
    }
    setInterval(function () {
        ctxStars.clearRect(0, 0, width, height);
        for (var i = 0; i < starList.length; i++) {
            starList[i].x -= starList[i].move;
            straightLine(ctxStars, starList[i].x, starList[i].y, starList[i].x + 1, starList[i].y, 'white', 0.75);
            if (starList[i].x <= 0) {
                starList[i] = newStar(width);
            }
        }
    }, 15)
    var meteorTime = Math.random() * 5000;//时间在0-5s之间随机
    var randMeteor = setInterval(randomMeteor, meteorTime);
    function randomMeteor() {
        meteorTime = Math.random() * 5000;
        var meteorItem = newMeteor();
        var timer2 = setInterval(function () {
            if (meteorItem.x < 0) {
                clearInterval(timer2);
            }
            ctxMeteor.clearRect(0, 0, width, height);
            meteorItem.x -= meteorItem.angle * meteorItem.speed;
            meteorItem.y += meteorItem.speed;
            straightLine(ctxMeteor, meteorItem.x, meteorItem.y, meteorItem.x - meteorItem.height * meteorItem.angle * meteorItem.speed, meteorItem.y + meteorItem.height * meteorItem.speed, 'white', 0.5);
        }, 10);
        clearInterval(randMeteor);
        randMeteor = setInterval(randomMeteor, meteorTime);//重新set定义随机时间
    }
})