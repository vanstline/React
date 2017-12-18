import Obj from './m.touch'
import axios from 'axios'
export default function(_this) {
  var main = document.querySelector('#wrap');
  var swiper = document.querySelector('#Home');
  var load = document.querySelector('#load');
  var loadImg = load.querySelector('.loadImg');
  var loadImg2 = load.querySelector('.loadImg2');
  var loadText = load.querySelector('.loadText');
  var footLoadImg = swiper.querySelector('.footLoadImg');
  var footLoadImg2 = swiper.querySelector('.footLoadImg2');
  var footLoadText = swiper.querySelector('.footLoadText');
  var loadH = load.offsetHeight;
  var footerLoad = swiper.querySelector('#footerLoad');
  var footerLoadH = footerLoad.offsetHeight;

  var newLoadDay = new Date().getDate();
  // console.log(css(main,"translateY"));
  loadImg.style.transition = ".3s";
  footLoadImg.style.transition = ".3s";
  Obj.mScroll({
    wrap: main,
    dir: "y",
    over: 'backOut',
    showBar: false,
    start: function() {
      swiper.style.transition = "none";
    },
    move: function() {

      var now = Obj.css(swiper, "translateY");
      var mainH = swiper.offsetHeight - main.offsetHeight
      if (now > loadH) {
        Obj.css(loadImg, "rotate", -180);
        loadText.innerHTML = "释放立即刷新";
      } else {
        Obj.css(loadImg, "rotate", 0);
        loadText.innerHTML = "下拉刷新";
        // console.log(now, mainH)
        if (Math.abs(now) - 80 > mainH) {
          // console.log('加载更多1')
          Obj.css(footLoadImg, "rotate", -180);
          footLoadText.innerHTML = "释放加载更多";
        } else {
          Obj.css(footLoadImg, "rotate", 0);
          footLoadText.innerHTML = "上拉加载";
        }
      }
    },
    up: function() {
      var now = Obj.css(swiper, "translateY");
      var mainH = swiper.offsetHeight - main.offsetHeight
      if (now > loadH) {
        cancelAnimationFrame(swiper.timer);
        swiper.style.transition = ".3s";
        Obj.css(swiper, "translateY", loadH);
        loadImg.style.display = "none";
        loadImg2.style.display = "block";
        loadText.innerHTML = "正在刷新";
        swiper.addEventListener('WebkitTransitionEnd', end);
        swiper.addEventListener('transitionend', end);

        function end() {
          swiper.removeEventListener('WebkitTransitionEnd', end);
          swiper.removeEventListener('transitionend', end);
          // creatLi(true);
          loadImg2.style.display = "none";
          loadText.innerHTML = "刷新完成";
          setTimeout(function() {
            Obj.css(swiper, "translateY", 0);
            swiper.addEventListener('WebkitTransitionEnd', end);
            swiper.addEventListener('transitionend', end);

            function end() {
              swiper.removeEventListener('WebkitTransitionEnd', end);
              swiper.removeEventListener('transitionend', end);
              loadImg.style.display = "block";
              loadText.innerHTML = "下拉刷新";
            }
          }, 500);
          axios.get('https://zhihu-daily.leanapp.cn/api/v1/last-stories')
            .then( res => {
              console.log(res.data);
              setTimeout( () => {
                _this.setState({
                  top_stories: res.data.STORIES.top_stories,
                  stories: res.data.STORIES.stories
                })
              })
            })
            .catch( () => {
              alert('请求失败')
            })
        }
      } else {
        if (Math.abs(now) - 80 > mainH) {

          loadAll()
        }

      }
    }
  });
  // 处理日期的函数
  var nowDate = new Date();
  var y,m,d= '';
  let num = 0;
  var dis = 60*60*24*1000;
  // 返回两个值 一个年月日格式作为参数发送请求 一个作为新闻页首
  function getDate(nowDate) {
    var datsArr = ['天','一','二','三','四','五','六'];
    nowDate = new Date(nowDate);
    var days = nowDate.getDay();
    y = addZreo(nowDate.getFullYear());
    m = addZreo((nowDate.getMonth() + 1));
    d = addZreo(nowDate.getDate());
    var dateFormat = `${m}月${d}日 星期${datsArr[days]}`;
    return [y+m+d,dateFormat];
  }
  // 补零
  function addZreo(n) {
    return n = n < 10 ? '0'+n : '' + n
  }
  var nub = 0; // 初始化  所要减的天数

  console.log(getDate(nowDate)[0]);

  //加载更多
  function loadAll() {
    var swiperH = Obj.css(swiper, 'translateY')
    cancelAnimationFrame(swiper.timer);
    swiper.style.transition = ".3s";
    // console.log(swiperH, footerLoadH);
    Obj.css(swiper, "translateY", swiperH + footerLoadH);
    footLoadImg.style.display = 'none';
    footLoadImg2.style.display = "block";
    footLoadText.innerHTML = '正在加载';
    swiper.addEventListener('WebkitTransitionEnd', end);
    swiper.addEventListener('transitionend', end);
    function end() {
      swiper.removeEventListener('WebkitTransitionEnd', end);
      swiper.removeEventListener('transitionend', end);
      // creatLi(true);
      footLoadImg2.style.display = "none";
      footLoadText.innerHTML = "加载完成";
      setTimeout(function() {
        // Obj.css(swiper, "translateY", 0);
        swiper.addEventListener('WebkitTransitionEnd', end);
        swiper.addEventListener('transitionend', end);

        function end() {
          swiper.removeEventListener('WebkitTransitionEnd', end);
          swiper.removeEventListener('transitionend', end);
          footLoadImg.style.display = "block";
          footLoadText.innerHTML = "上拉加载";
        }
      }, 500);

      axios.get(`https://zhihu-daily.leanapp.cn/api/v1/before-stories/${getDate(nowDate)[0]-nub}`)
        .then( res => {
          console.log(res.data.STORIES);

          var result = res.data.STORIES.stories;
          result = [
            ..._this.state.stories,
            ...result
          ];
          _this.setState({stories: result})
          footLoadImg.style.display = 'block';
          footLoadText.innerHTML = '正在加载';
          nub++;
        })
        .catch( () => {
          alert('请求失败')
        })
    }
  }
}
