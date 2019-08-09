/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var targets = document.querySelectorAll(".nav-item");
targets.forEach(function (target) {
  target.addEventListener("click", function () {
    console.log(this);
    var navs = this.parentElement.children;
    var content = document.querySelector("#".concat(this.dataset.view));
    console.log(content);
    Array.prototype.forEach.call(navs, function (nav) {
      nav.classList.remove("active");
    });
    this.classList.add("active");
    Array.prototype.forEach.call(content.parentElement.children, function (child) {
      child.classList.add("hide");
    });
    content.classList.remove("hide");
  });
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tab_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tab_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tab_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slider_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__radio_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rank_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__player_js__ = __webpack_require__(7);







var slider = new __WEBPACK_IMPORTED_MODULE_1__slider_js__["a" /* Slider */](document.querySelector("#slider"));
var radio = new __WEBPACK_IMPORTED_MODULE_2__radio_js__["a" /* Radio */](document.querySelector(".radio-list"));
var toplist = new __WEBPACK_IMPORTED_MODULE_3__rank_js__["a" /* Toplist */](document.querySelector("#rank-view"));
var search = new __WEBPACK_IMPORTED_MODULE_4__search_js__["a" /* Search */](document.querySelector("#search-view"));
var musicplayer = new __WEBPACK_IMPORTED_MODULE_5__player_js__["a" /* MusicPlayer */](document.querySelector("#player"));
var playerBtn = document.querySelector("#player-btn");
playerBtn.addEventListener("click", showPlayer);

function showPlayer() {
  var music = document.querySelector("#player");

  if (music.classList.contains("show")) {
    music.classList.remove("show");
    music.classList.add("hide");
  } else {
    music.classList.remove("hide");
    music.classList.add("show");
  }
}

function onHashChange() {
  var hash = location.hash;

  if (/^#player\?.+/.test(hash)) {
    var matchs = hash.slice(hash.indexOf("?") + 1).match(/(\w+)=([^&]+)/g);
    var options = matchs && matchs.reduce(function (res, cur) {
      var arr = cur.split("=");
      res[arr[0]] = decodeURI(arr[1]); //记得转码

      return res;
    }, {}); // 为啥有个空的

    console.log(options);
    musicplayer.play(options);
    musicplayer.show();
  } else {
    musicplayer.hide();
  }
}

onHashChange();
window.addEventListener("hashchange", onHashChange);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Slider; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slider =
/*#__PURE__*/
function () {
  function Slider(el, interval) {
    _classCallCheck(this, Slider);

    this.$el = el;
    this.slides = {};
    this.interval = interval || 3000;
    this.index = 0;
    this.start();
    this.launch();
  }

  _createClass(Slider, [{
    key: "launch",
    value: function launch() {
      var _this = this;

      fetch("./json/rec.json").then(function (res) {
        return res.json();
      }
      /*因为得到的响应还不是一个json对象，需要用 json() 来把它转化为json对象*/
      ).then(function (json) {
        return json.data.slider;
      }).then(function (json) {
        return _this.render(json);
      });
      return this;
    }
  }, {
    key: "render",
    value: function render(sliders) {
      this.slides = sliders.map(function (slide) {
        return {
          link: slide.linkUrl,
          image: slide.picUrl
        };
      });
      this.$el.innerHTML = "<div class=\"qq-slider-wrap\"></div>";
      this.$wrap = this.$el.firstChild;
      this.$wrap.style.width = "".concat(this.slides.length * 100, "%");
      this.$wrap.innerHTML = this.slides.map(function (slide) {
        return "<div class=\"qq-slider-item\">\n\t\t\t<a href=\"".concat(slide.link, "\">\n\t\t\t\t<img src=\"").concat(slide.image, "\">\n\t\t\t</a>\n\t\t\t</div>");
      }).join("");
    }
  }, {
    key: "start",
    value: function start() {
      setInterval(this.next.bind(this), this.interval);
    }
  }, {
    key: "next",
    value: function next() {
      this.index += 1;

      if (this.index == this.slides.length) {
        this.$wrap.style.transform = "translate(0)";
        this.index = 0;
        return;
      }

      var x = "-".concat(this.index * 100 / this.slides.length, "%");
      this.$wrap.style.transform = "translate(".concat(x, ")");
    }
  }]);

  return Slider;
}();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Radio; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Radio =
/*#__PURE__*/
function () {
  function Radio(el) {
    _classCallCheck(this, Radio);

    this.$el = el;
    this.launch();
  }

  _createClass(Radio, [{
    key: "launch",
    value: function launch() {
      var _this = this;

      fetch("../json/rec.json").then(function (res) {
        return res.json();
      }
      /*因为得到的响应还不是一个json对象，需要用 json() 来把它转化为json对象*/
      ).then(function (json) {
        return json.data.radioList;
      }).then(function (json) {
        return _this.render(json);
      });
      return this;
    }
  }, {
    key: "render",
    value: function render(radios) {
      this.$el.innerHTML = radios.map(function (radio) {
        return "\n\t\t\t\t<li class=\"radio-item\"><a href=\"#\">\n\t\t\t\t\t<img src=\"".concat(radio.picUrl, "\">\n\t\t\t\t\t<span class=\"icon icon_play\"></span>\n\t\t\t\t\t<p>").concat(radio.Ftitle, "</p>\n\t\t\t\t</a></li>\n\t \t\t");
      }).join("");
    }
  }]);

  return Radio;
}();

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Toplist; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazyloader_js__ = __webpack_require__(5);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Toplist =
/*#__PURE__*/
function () {
  function Toplist(el) {
    _classCallCheck(this, Toplist);

    this.$el = el;
    this.launch();
  }

  _createClass(Toplist, [{
    key: "launch",
    value: function launch() {
      var _this = this;

      fetch("./json/rank.json").then(function (res) {
        return res.json().then(function (json) {
          return json.req_0.data.group;
        });
      }).then(function (json) {
        return _this.render(json);
      });
      console.log(this);
      return this;
    }
  }, {
    key: "render",
    value: function render(tops) {
      var _this2 = this;

      this.$el.innerHTML = tops.map(function (top) {
        return "<ul id=\"group".concat(top.groupId, "\">\n\t\t\t\t").concat(_this2.toplist(top.toplist), "\n\t\t\t</ul>");
      }).join("");
      Object(__WEBPACK_IMPORTED_MODULE_0__lazyloader_js__["a" /* lazyload */])(this.$el.querySelectorAll("#rank-view .toplist .lazyload"));
    }
  }, {
    key: "toplist",
    value: function toplist(items) {
      var _this3 = this;

      return items.map(function (item) {
        return "<li class=\"toplist\">\n\t\t\t\t<div class=\"top-image\"><img class=\"lazyload\" data-src=\"".concat(item.frontPicUrl, "\"></div>\n\t\t\t\t<div class=\"top-content\">\n\t\t\t\t\t<h3 class=\"top-title\">").concat(item.title, "</h3>\n\t\t\t\t\t<ul class=\"songlist\">\n\t\t\t\t\t\t").concat(_this3.songlist(item.song), "\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</li>");
      }).join("");
    }
  }, {
    key: "songlist",
    value: function songlist(songs) {
      return songs.map(function (song, i) {
        return "<li><span class=\"song-index\">".concat(i + 1, "</span><span class=\"song\">").concat(song.title, "</span><span class=\"singer\">").concat(song.singerName, "</span></li>");
      }).join("");
    }
  }]);

  return Toplist;
}();

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = lazyload;
function lazyload(images) {
  var imgs = Array.prototype.slice.call(images);
  var onscroll = throttle(function () {
    if (imgs.length === 0) {
      return window.removeEventListener("scroll", onscroll);
    }

    imgs = imgs.filter(function (img) {
      return img.classList.contains("lazyload");
    });
    imgs.forEach(function (img) {
      if (inViewport(img)) {
        loadImage(img);
      }
    });
  }, 400);
  window.addEventListener("scroll", onscroll);
  window.dispatchEvent(new Event("scroll")); //我为什么触发不了
}

function inViewport(img) {
  var _img$getBoundingClien = img.getBoundingClientRect(),
      top = _img$getBoundingClien.top,
      bottom = _img$getBoundingClien.bottom,
      left = _img$getBoundingClien.left,
      right = _img$getBoundingClien.right;

  var vpWidth = document.documentElement.clientWidth;
  var vpHeight = document.documentElement.clientHeight;
  return (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) && (left > 0 && left < vpWidth || right > 0 && right < vpWidth);
}

function loadImage(img, callback) {
  var image = new Image(); //Image()函数将会创建一个新的HTMLImageElement实例

  image.src = img.dataset.src;

  image.onload = function () {
    img.src = image.src;
    img.classList.remove("lazyload");
    if (typeof callback === "function") callback();
  };
}

function throttle(func, wait) {
  var prev, timer;
  return function fn() {
    var curr = Date.now();
    var differ = curr - prev;

    if (!prev || differ >= wait) {
      func();
      prev = curr;
    } else if (differ < wait) {
      clearTimeout(timer);
      timer = setTimeout(func, wait - differ);
    }
  };
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Search; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Search =
/*#__PURE__*/
function () {
  function Search(el) {
    _classCallCheck(this, Search);

    this.$el = el;
    this.$input = this.$el.querySelector("#search");
    this.$songs = this.$el.querySelector(".song-list");
    this.$input.addEventListener("keyup", this.onKeyUp.bind(this));
    this.keyword = "";
    this.page = 1;
    this.perpage = 20;
    this.song = [];
    this.nomore = false;
    this.fetching = false; //用来防止每滚一下都发一次请求

    this.onscroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onscroll);
  }

  _createClass(Search, [{
    key: "onKeyUp",
    value: function onKeyUp(event) {
      var keyword = event.target.value.trim(); //trim 去掉前后空格

      if (!keyword) return this.reset();
      if (event.key !== "Enter") return;
      this.search(keyword);
    }
  }, {
    key: "onScroll",
    value: function onScroll(event) {
      if (this.nomore) return;

      if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50) {
        this.search(this.keyword, this.page + 1);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.page = 1;
      this.keyword = "";
      this.song = [];
      this.$songs.innerHTML = "";
    }
  }, {
    key: "search",
    value: function search(keyword, page) {
      var _this = this;

      if (this.fetching) return; //用来防止每滚一下都发一次请求

      this.fetching = true; //用来防止每滚一下都发一次请求

      this.keyword = keyword;
      fetch("http://localhost:4000/search?keyword=".concat(this.keyword, "&page=").concat(page || this.page)).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this.page = json.data.song.curpage;
        _this.nomore = json.message === "no results";
        /*this.songs.push(...json.data.song.list) */
        //把请求到的json.data.song.list缓存起来

        console.log(json.data.song.list);
        return json.data.song.list;
      }).then(function (songs) {
        return _this.append(songs);
      }).then(function () {
        return _this.fetching = false;
      }) //用来防止每滚一下都发一次请求
      ["catch"](function () {
        return _this.fetching = false;
      }); //用来防止每滚一下都发一次请求
    }
  }, {
    key: "append",
    value: function append(songs) {
      var html = songs.map(function (song) {
        return "<li class=\"song-item\">\n\t\t\t <a href=\"#player?artist=".concat(song.singer[0].name, "&songid=").concat(song.songid, "&songmid=").concat(song.songmid, "&songname=").concat(song.songname, "&albummid=").concat(song.albummid, "&duration=").concat(song.interval, "\">\n\t\t\t\t<i class=\"icon icon-music\"></i>\n\t\t\t\t<div class=\"song-name ellipsis\">").concat(song.songname, "</div>\n\t\t\t\t<div class=\"song-artist ellipsis\">").concat(song.singer.map(function (s) {
          return s.name;
        }).join(""), "</div>\n\t\t\t</a>\n\t\t\t</li>");
      }).join("");
      this.$songs.insertAdjacentHTML("beforeend", html); //insertAdjacentHTML 不会像innerHTML一样破坏掉已存在的元素
    }
  }]);

  return Search;
}();

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MusicPlayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__progress_bar_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lyrics_js__ = __webpack_require__(9);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var MusicPlayer =
/*#__PURE__*/
function () {
  function MusicPlayer(el) {
    _classCallCheck(this, MusicPlayer);

    this.$el = el;
    this.$el.addEventListener("click", this); //为啥这个this指向handleEvent

    this.creatAudio();
    this.progress = new __WEBPACK_IMPORTED_MODULE_0__progress_bar_js__["a" /* ProgressBar */](this.$el.querySelector(".progress"), false);
    this.lyrics = new __WEBPACK_IMPORTED_MODULE_1__lyrics_js__["a" /* Lyrics */](this.$el.querySelector(".lyric"));
  }

  _createClass(MusicPlayer, [{
    key: "creatAudio",
    value: function creatAudio() {
      this.$audio = document.createElement("audio");
      this.$audio.loop = true;
      document.body.appendChild(this.$audio);
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      //我点击#player里面的任何一个元素 都会被捕获到
      var target = event.target;
      console.log(target);

      switch (true) {
        case target.matches(".icon-play"):
          this.onPlay(event);
          break;

        case target.matches(".icon-pause"):
          this.onPause(event);
          break;

        case target.matches(".album-img"):
          this.switchLyric(event);
          break;

        case target.matches(".lyrics-lines"):
          this.switchAlbum(event);
          break;
      }
    }
  }, {
    key: "onPlay",
    value: function onPlay(event) {
      this.$audio.play();
      this.progress.start();
      event.target.classList.remove("icon-play");
      event.target.classList.add("icon-pause");
    }
  }, {
    key: "onPause",
    value: function onPause(event) {
      this.$audio.pause();
      this.progress.pause();
      event.target.classList.remove("icon-pause");
      event.target.classList.add("icon-play");
    }
  }, {
    key: "switchLyric",
    value: function switchLyric(event) {
      if (event.target.parentNode.classList.contains("show")) {
        event.target.parentNode.classList.remove("show");
        event.target.parentNode.classList.add("hide");
        event.target.parentNode.nextElementSibling.classList.remove("hide");
        event.target.parentNode.nextElementSibling.classList.add("show");
      }
    }
  }, {
    key: "switchAlbum",
    value: function switchAlbum(event) {
      if (event.target.parentNode.parentNode.classList.contains("show")) {
        event.target.parentNode.parentNode.classList.remove("show");
        event.target.parentNode.parentNode.classList.add("hide");
        event.target.parentNode.parentNode.previousElementSibling.classList.remove("hide");
        event.target.parentNode.parentNode.previousElementSibling.classList.add("show");
      }
    }
  }, {
    key: "play",
    value: function play() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!options) return;
      this.$el.querySelector(".song-name").innerText = options.songname;
      this.$el.querySelector(".singer-name").innerText = options.artist;
      this.progress.reset(options.duration);
      var url = "https://y.gtimg.cn/music/photo_new/T002R300x300M000".concat(options.albummid, ".jpg?max_age=2592000");
      this.$el.querySelector(".album-img").src = url;
      this.$el.querySelector(".bg img").src = url;

      if (options.songid) {
        console.log(options.songid);
        this.$audio.src = "http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400002TRY4a3zfxC8.m4a?guid=5561900148&vkey=7D51FAD7826BC57DA7A012F8D5F54F7E6F965EDD2DB6145A5ED872924D492058813AE9692036C9CE330CA6F29B36B56117DA99CCE6D82F30&uin=0&fromtag=38";
        fetch("https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&nobase64=1&musicid=".concat(options.songid, "&songtype=0&_=1565247849296&jsonpCallback=jsonp1")).then(function (res) {
          return res.json;
        }).then(function (json) {
          return json.lyric;
        }).then(function (text) {
          return _this.Lyrics.reset(text);
        })["catch"](function () {});
      }

      this.show();
    }
  }, {
    key: "show",
    value: function show() {
      if (this.$el.classList.contains("hide")) {
        this.$el.classList.remove("hide");
        this.$el.classList.add("show");
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this.$el.classList.contains("show")) {
        this.$el.classList.remove("show");
        this.$el.classList.add("hide");
      }
    }
  }]);

  return MusicPlayer;
}();

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBar; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProgressBar =
/*#__PURE__*/
function () {
  function ProgressBar(el, duration, start) {
    _classCallCheck(this, ProgressBar);

    this.$el = el;
    this.elapsed = 0;
    this.duration = duration || 0;
    this.progress = 0;
    this.render();
    this.$progress = this.$el.querySelector(".progress-bar-progress");
    this.$elapsed = this.$el.querySelector(".progress-elapsed");
    this.$duration = this.$el.querySelector(".progress-duration");
    this.$elapsed.innerText = this.formatTime(this.elapsed);
    this.$duration.innerText = this.formatTime(this.duration);
    if (start) this.start();
  }

  _createClass(ProgressBar, [{
    key: "start",
    value: function start() {
      this.intervalId = setInterval(this.update.bind(this), 1000);
    }
  }, {
    key: "pause",
    value: function pause() {
      clearInterval(this.intervalId);
    }
  }, {
    key: "update",
    value: function update() {
      if (this.elapsed >= this.duration) this.reset();
      this.elapsed += 1;
      this.progress = this.elapsed / this.duration;
      this.$progress.style.transform = "translate(".concat(this.progress * 100, "%)");
      this.$elapsed.innerText = this.formatTime(this.elapsed);
    }
  }, {
    key: "reset",
    value: function reset(duration) {
      this.pause();
      this.elapsed = 0;
      this.progress = 0;

      if (duration) {
        this.duration = +duration; //为什么这里有一个+号

        this.$duration.innerText = this.formatTime(this.duration);
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.$el.innerHTML = "\n\t\t\t<div class=\"progress-time progress-elapsed\"></div>\n\t\t\t<div class=\"progress-bar\">\n\t\t\t\t<div class=\"progress-bar-progress\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"progress-time progress-duration\"></div>\n\t\t";
    }
  }, {
    key: "formatTime",
    value: function formatTime(seconds) {
      var mins = Math.floor(seconds / 60);
      var secs = Math.floor(seconds % 60);
      if (mins < 10) mins = "0" + mins;
      if (secs < 10) secs = "0" + secs;
      return "".concat(mins, ":").concat(secs);
    }
  }]);

  return ProgressBar;
}();

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Lyrics; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Lyrics =
/*#__PURE__*/
function () {
  function Lyrics(el) {
    _classCallCheck(this, Lyrics);

    this.$el = el;
    this.$el.innerHTML = "<div class='lyric-line'></div>";
    this.$line = this.$el.querySelector(".lyric-line");
    this.text = "";
    this.index = 0;
    this.elapsed = 0;
    this.lyrics = [];
    this.reset(this.text);
  }

  _createClass(Lyrics, [{
    key: "start",
    value: function start() {
      console.log("1");
      this.intervalId = setInterval(this.update.bind(this), 1000);
    }
  }, {
    key: "pause",
    value: function pause() {
      clearInterval(this.intervalId);
    }
  }, {
    key: "update",
    value: function update() {
      console.log("2");
      this.elapsed += 1;
      if (this.index === this.lyrics.length - 1) return this.reset();

      for (var i = this.index + 1; i < this.lyrics.length; i++) {
        var seconds = this.getSeconds(this.lyrics[i]);

        if (this.elapsed === seconds && (!this.lyrics[i + 1] || this.elapsed < this.getSeconds(this.lyrics[i + 1]))) {
          this.$line.children[this.index].classList.remove("active");
          this.$line.children[i].classList.add("active");
          this.index = i;
          break;
        }
      }

      if (this.index > 2) {
        var y = -(this.index - 2) * this.LINE_HEIGHT;
        this.$line.style.transform = "translateY(".concat(y, "px)");
      }
    }
  }, {
    key: "reset",
    value: function reset(text) {
      this.pause();
      this.index = 0;
      this.elapsed = 0;

      if (text) {
        this.text = this.formatText(text) || "";
        this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || [];

        if (this.lyrics.length) {
          this.render();
          this.$line.children[this.index].classList.add("active");
        }
      }
    }
  }, {
    key: "restart",
    value: function restart() {
      this.reset();
      this.start();
    }
  }, {
    key: "getSeconds",
    value: function getSeconds(line) {
      return +line.replace(/^\[(\d{2}):(\d{2}).*/, function (match, p1, p2) {
        return 60 * +p1 + +p2;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var html = this.lyrics.map(function (line) {
        return "\n\t\t\t<div class=\"lyrics-lines\">".concat(line.slice(10), "</div>\t\t\n\t\t");
      }).join("");
      this.$line.innerHTML = html;
    }
  }, {
    key: "formatText",
    value: function formatText(text) {
      var div = document.createElement("div");
      div.innerHTML = text;
      return div.innerText;
    }
  }]);

  return Lyrics;
}();
Lyrics.prototype.LINE_HEIGHT = 42;

/***/ })
/******/ ]);