function swip(lbox, sbox, tof) {
	/*
	 lbox:输入一个dom元素，代表需要发生滚动的盒子
	 sbox:输入一个dom元素，代表显示区域的盒子
	 tof:是否有点击事件   true/false
	 * */
	let startY = 0; //触摸瞬间的Y坐标
	let endY = 0; //移动完后的Y坐标
	let startX = 0;
	let endX = 0;
	let currY = 0; //当前Y坐标
	let currX = 0;
	let isMove = false; //是否发生移动
	let allowMove = 100; //允许拉动的最大距离
	let aLis = lbox.querySelectorAll('li');
	ifclick = tof||false;
	
	
	//触摸瞬间
	lbox.addEventListener('touchstart', function(e) {
		startX = e.changedTouches[0].clientX;
		startY = e.changedTouches[0].clientY; //给触摸瞬间的Y坐标赋值
		lbox.style.transition = 'none'; //移除ul的过渡效果
	});
	
	
	
	
	//发生移动时
	lbox.addEventListener('touchmove', function(e) {
		console.log('move');
		endX = e.changedTouches[0].clientX;
		endY = e.changedTouches[0].clientY; //每次移动都会给移动完后的Y坐标赋值，最后一次移动完就是最终的Y坐标的值
		if(lbox.offsetHeight > sbox.offsetHeight) {
			if(currY + endY - startY >= allowMove) { //当移动距离大于允许拉动的最大距离时
				//什么也不做
				//			lbox.style.transform = 'translateY(' + allowMove + 'px)';

			} else if(currY + endY - startY <= sbox.offsetHeight - lbox.offsetHeight - allowMove) { //当移动距离小于允许拉动的最大距离时(小盒子-大盒子-允许拉动的最大距离)
				//什么也不做
				//			lbox.style.transform = 'translateY(' + sbox.offsetHeight - lbox.offsetHeight - allowMove + 'px)';

			} else { //拉动处于区间内时
				//移动长盒子在Y轴的坐标，达到拉动的效果
				lbox.style.transform = 'translateY(' + (currY + endY - startY) + 'px)';
			}
		} else {
			if(currX + endX - startX >= allowMove) { //当移动距离大于允许拉动的最大距离时
				//什么也不做
//							lbox.style.transform = 'translateX(' + allowMove + 'px)';

			} else if(currX + endX - startX <= sbox.offsetWidth - lbox.offsetWidth - allowMove) { //当移动距离小于允许拉动的最大距离时(小盒子-大盒子-允许拉动的最大距离)
				//什么也不做
//							lbox.style.transform = 'translateX(' + sbox.offsetWidth - lbox.offsetWidth - allowMove + 'px)';

			} else { //拉动处于区间内时
				//移动长盒子在Y轴的坐标，达到拉动的效果
				lbox.style.transform = 'translateX(' + (currX + endX - startX) + 'px)';
			}
		}

		//同时，打开是发生移动的开关
		isMove = true;
	});
	
	
	
	
	//拉动结束时
	lbox.addEventListener('touchend', function(e) {
		if(isMove) { //如果发生了移动
			if(lbox.offsetHeight > sbox.offsetHeight) {
				currY = currY + endY - startY; //给当前的Y坐标赋值
				if(currY >= 0) { //若大于等于0
					currY = 0; //将当前Y坐标赋为0，即长盒子的最高点
				} else if(currY <= sbox.offsetHeight - lbox.offsetHeight) { //若小于可以显示的的最大距离时(小盒子-大盒子)
					currY = parseInt(sbox.offsetHeight - lbox.offsetHeight); //将当前Y坐标赋值，为长盒子的最底端
				}
				lbox.style.transition = 'all 0.1s'; //给长盒子添加过渡时间
				lbox.style.transform = 'translateY(' + currY + 'px)'; //进行移动
			} else {
				currX = currX + endX - startX; //给当前的Y坐标赋值
				if(currX >= 0) { //若大于等于0
					currX = 0; //将当前Y坐标赋为0，即长盒子的最高点
				} else if(currX <= sbox.offsetWidth - lbox.offsetWidth) { //若小于可以显示的的最大距离时(小盒子-大盒子)
					currX = parseInt(sbox.offsetWidth - lbox.offsetWidth); //将当前Y坐标赋值，为长盒子的最底端
				}
				lbox.style.transition = 'all 0.1s'; //给长盒子添加过渡时间
				lbox.style.transform = 'translateX(' + currX + 'px)'; //进行移动
			}
			isMove = false; //关掉开关
		} else { //如果没有发生移动，即发生了点击
				console.log('notmove');
			if(tof) {
				for(let i = 0; i < aLis.length; i++) {
					aLis[i].classList.remove('active'); //清除所有li的active样式
					aLis[i].index = i; //给每个li添加索引
				}
				e.target.classList.add('active'); //当前点击的li添加active样式

				currY = parseInt(-e.target.index * e.target.offsetHeight); //将当前的Y坐标赋值点击的li的位置
				if(currY <= sbox.offsetHeight - lbox.offsetHeight) { //若该位置小于可以显示的的最大距离时(小盒子-大盒子)
					currY = parseInt(sbox.offsetHeight - lbox.offsetHeight); //当前Y坐标赋值到长盒子最底端
				}
				lbox.style.transition = 'all 0.4s'; //添加过渡效果
				lbox.style.transform = 'translateY(' + currY + 'px)'; //移动长盒子的位置
			}

		}

	});
}