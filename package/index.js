import Vue from 'vue'
Vue.directive('stretch', {
  // 当被绑定的元素插入到 DOM 中时……
  resize (oParent, handle, type, bind) {
    handle.onmousedown = function (event) {
      const screenX = event.clientX - handle.offsetLeft  //点击点离屏幕左边的距离
      const screenY = event.clientY - handle.offsetTop //点击点离屏幕上边的距离
      const parentHeight = oParent.offsetHeight
      const parentWidth = oParent.offsetWidth
      const parentTop = oParent.offsetTop
      const parentLeft = oParent.offsetLeft

      const style = window.getComputedStyle(oParent)
      const getCssNumber = (type) => {
        return parseFloat(style[type])
      }

      if (getCssNumber('marginTop')) {
        oParent.style.top = style.marginTop
        oParent.style.marginTop = 0
      }

      if (getCssNumber('marginLeft')) {
        oParent.style.left = style.marginLeft
        oParent.style.marginLeft = 0
      }
      document.onmousemove = function (event) {

        const moveX = event.clientX - screenX //x轴移动的距离
        const moveY = event.clientY - screenY //Y轴移动的距离
        const maxWidth = document.documentElement.clientWidth - 100 //设置拉伸最大宽度
        let minW, minH
        console.log(bind)
        if (bind?.value?.minWidth) {
          minW = bind?.value?.minWidth  //设置拉伸最小宽度
        } else {
          minW = 320  //设置拉伸最小宽度
        }
        if (bind?.value?.minHeight) {
          minH = bind?.value?.minHeight //设置拉伸最小高度
        } else {
          minH = 80//设置拉伸最小高度
        }

        console.log(minW, minH)


        const leftPosition = moveX < 0 ? parentLeft - Math.abs(moveX) : parentLeft + Math.abs(moveX)  //left 的值
        const topPosition = moveY < 0 ? parentTop - Math.abs(moveY) : parentTop + Math.abs(moveY)
        switch (type) {
          case 'resizeTR': {
            if (moveX > maxWidth) {
              oParent.style.width = `${maxWidth}px`
            } else {
              oParent.style.width = `${moveX < minW ? minW
                : moveX}px`
            }
            const height = parentHeight + Math.abs(moveY) < minH ? minH : parentHeight + Math.abs(moveY)
            const minHeight = parentHeight - moveY < minH ? minH : parentHeight - moveY
            oParent.style.height = `${moveY < 0 ? height : minHeight}px`
            if (minHeight > minH) {
              console.log(parentTop, Math.abs(moveY))
              oParent.style.top = `${topPosition}px`
            }
            break;
          }

          case 'resizeBR': {
            if (moveX > maxWidth) {
              oParent.style.width = `${maxWidth}px`
            } else {
              oParent.style.width = `${moveX < minW ? minW
                : moveX}px`
            }
            oParent.style.height = `${moveY < minH ? minH : moveY}px`
            break;
          }

          case 'resizeTL': {
            console.log(moveX)
            if (moveX > maxWidth) {
              oParent.style.width = `${maxWidth}px`
            } else {

              oParent.style.width = `${parentWidth - moveX < minW ? minW
                : parentWidth - moveX}px`
              if (parentWidth - moveX >= minW) {
                oParent.style.left = `${leftPosition}px`
              }
            }
            const minHeight = parentHeight - moveY < minH ? minH : parentHeight - moveY
            oParent.style.height = `${minHeight}px`
            if (minHeight > minH) {
              oParent.style.top = `${topPosition}px`
            }
            break;
          }

          case 'resizeBL': {
            const minWidth = parentWidth - moveX < minW ? minW : parentWidth - moveX

            if (parentWidth >= minW && moveX < 0) {
              oParent.style.width = `${minWidth}px`
              if (minWidth > minW) {
                oParent.style.left = `${leftPosition}px`
              }

            }
            if (parentWidth >= minW && moveX > 0) {
              oParent.style.width = `${minWidth}px`
              if (minWidth > minW) {
                oParent.style.left = `${leftPosition}px`
              }
            }
            oParent.style.height = `${moveY < minH ? minH : moveY}px`
          }
        }

        return false
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
      return false
    }
  },
  createElement (name, parentDom, resizeFunction, bind) {

    const createDom = document.createElement('div');
    createDom.classList.add(name);
    if (bind?.value?.className) {
      const { className } = bind.value;
      const insideDom = parentDom.getElementsByClassName(className)[0];
      insideDom.classList.add('kfang-scale-warp');
      insideDom.appendChild(createDom);
      resizeFunction(insideDom, createDom, name, bind)
    } else {
      parentDom.classList.add('kfang-scale-warp');
      parentDom.appendChild(createDom);
      resizeFunction(parentDom, createDom, name, bind)
    }


  },
  bind: function (el, bind) {
    const { resize, createElement } = bind.def;
    // 聚焦元素
    ['resizeTR', 'resizeBR', 'resizeTL', 'resizeBL'].forEach((name) => createElement(name, el, resize, bind))
  }
})

