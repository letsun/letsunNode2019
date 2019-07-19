/**
 * Created by qiu on 2016/12/13.
 */
/**
 * @desc 百度地图
 * @param cfg {Object} 参数
 * @param cfg.content {String} 地图容器的id
 * @param cfg.position {Array} 地图中心点的坐标 [x, y]
 * @param cfg.size {Number} 地图的大小 1 - 18 数值越大地图越大，默认为18
 * @param cfg.drag {Boolean} 是否可以拖拽，默认为true
 * @param cfg.scrollWheelZoom {Boolean} 是否允许鼠标滚轮缩放，默认为true
 * @param cfg.doubleClickZoom {Boolean} 是否允许双击缩放，默认为true
 * @param cfg.keyboard {Boolean} 是否允许键盘移动地图，默认为true
 * @param cfg.navigationControl {Boolean} 是否添加缩放控件，默认为true
 * @param cfg.overviewMapControl {Boolean} 是否添加缩略图控件，默认为true
 * @param cfg.scaleControl {Boolean} 是否添加比例尺控件，默认为true
 * @param cfg.markers {Array} 地图标注
 */
var baiduMap = function (cfg) {
    var self = this;

    self.content = cfg.content;
    self.position = cfg.position;
    self.size = cfg.size || 18;
    self.drag = cfg.drag;
    if (cfg.drag === undefined) {
        self.drag = true;
    }
    self.scrollWheelZoom = cfg.scrollWheelZoom;
    if (cfg.scrollWheelZoom === undefined) {
        self.scrollWheelZoom = true;
    }
    self.doubleClickZoom = cfg.doubleClickZoom;
    if (cfg.doubleClickZoom === undefined) {
        self.doubleClickZoom = true;
    }
    self.keyboard = cfg.keyboard;
    if (cfg.keyboard === undefined) {
        self.keyboard = true;
    }
    self.navigationControl = cfg.navigationControl;
    if (cfg.navigationControl === undefined) {
        self.navigationControl = true;
    }
    self.overviewMapControl = cfg.overviewMapControl;
    if (cfg.overviewMapControl === undefined) {
        self.overviewMapControl = true;
    }
    self.scaleControl = cfg.scaleControl;
    if (cfg.scaleControl === undefined) {
        self.scaleControl = true;
    }
    self.markers = cfg.markers || [];

    for (var i = 0; i < self.markers.length; i++) {
        if (!self.markers[i].isOpen) {
            self.markers[i].isOpen = 1;
        }
        if (!self.markers[i].icon) {
            self.markers[i].icon = {w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5};
        }
        if (!self.markers[i].iconUrl) {
            self.markers[i].iconUrl = "http://app.baidu.com/map/images/us_mk_icon.png";
        }
    }

    self.init();
};

(function () {
    "use strict";

    /**
     * @desc 创建和初始化地图
     */
    baiduMap.prototype.init = function () {
        var self = this;

        self.createMap();
        self.setMapEvent();
        self.addMapControl();
        self.addMarker();
    };

    /**
     * @desc 创建地图，设置初始位置和地图大小
     */
    baiduMap.prototype.createMap = function () {
        var self = this;

        //在百度地图容器中创建一个地图
        self.map = new BMap.Map(self.content);

        //定义一个中心点坐标
        var point = new BMap.Point(self.position[0], self.position[1]);

        //设定地图的中心点和坐标并将地图显示在地图容器中
        self.map.centerAndZoom(point, self.size);
    };

    /**
     * @desc 设置地图事件
     */
    baiduMap.prototype.setMapEvent = function () {
        var self = this;

        //地图拖拽事件，默认启用
        if (!self.drag) {
            self.map.disableDragging();
        }

        //滚轮缩放大小
        if (self.scrollWheelZoom) {
            self.map.enableScrollWheelZoom();
        } else {
            self.map.disableScrollWheelZoom();
        }

        //鼠标双击放大，默认启用
        if (!self.doubleClickZoom) {
            self.map.disableDoubleClickZoom();
        }

        //键盘上下左右键移动地图
        if (self.keyboard) {
            self.map.enableKeyboard()
        } else {
            self.map.disableKeyboard();
        }
    };

    /**
     * @desc 添加地图控件
     */
    baiduMap.prototype.addMapControl = function () {
        var self = this;

        //向地图中添加缩放控件
        if (self.navigationControl) {
            var ctrl_nav = new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
                type: BMAP_NAVIGATION_CONTROL_LARGE
            });
            self.map.addControl(ctrl_nav);
        }

        //向地图中添加缩略图控件
        if (self.overviewMapControl) {
            var ctrl_ove = new BMap.OverviewMapControl({
                anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                isOpen: 1
            });
            self.map.addControl(ctrl_ove);
        }

        //向地图中添加比例尺控件
        if (self.scaleControl) {
            var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
            self.map.addControl(ctrl_sca);
        }
    };

    /**
     * @desc 添加标注
     */
    baiduMap.prototype.addMarker = function () {
        var self = this;

        for (var i = 0; i < self.markers.length; i++) {
            var mark = self.markers[i];

            var p0 = mark.point.split("|")[0];
            var p1 = mark.point.split("|")[1];
            var point = new BMap.Point(p0, p1);

            //var iconImg = self.createIcon(mark);

            var marker = new BMap.Marker(point);

            var label = new BMap.Label(mark.title, {"offset": new BMap.Size(mark.icon.lb - mark.icon.x + 10, -20)});

            marker.setLabel(label);
            self.map.addOverlay(marker);
            label.setStyle({
                borderColor: "#808080",
                color: "#333",
                cursor: "pointer"
            });

            (function (i) {
                var iw = self.createInfoWindow(i);
                var _marker = marker;

                _marker.addEventListener("click", function () {
                    this.openInfoWindow(iw);
                });

                iw.addEventListener("open", function () {
                    _marker.getLabel().hide();
                });

                iw.addEventListener("close", function () {
                    _marker.getLabel().show();
                });

                label.addEventListener("click", function () {
                    _marker.openInfoWindow(iw);
                });

                if (!!mark.isOpen) {
                    label.hide();
                    _marker.openInfoWindow(iw);
                }
            })(i)
        }
    };

    /**
     * @desc 创建InfoWindow
     * @param i
     */
    baiduMap.prototype.createInfoWindow = function (i) {
        var self = this;

        var mark = self.markers[i];
        var html = '<b class="iw_poi_title" title="' + mark.title + '" style="color: #CC5522; font-size: 14px;' +
            'font-weight: bold; overflow: hidden; padding-right: 13px ;white-space:nowrap">' + mark.title + '</b>' +
            '<div class="iw_poi_content" style="font: 12px arial,sans-serif; overflow: visible; padding-top: 4px;' +
            'white-space: -moz-pre-wrap; word-wrap: break-word">' + mark.content + '</div>';

        return new BMap.InfoWindow(html);
    };

    /**
     * @desc 创建图标
     * @param mark
     */
    baiduMap.prototype.createIcon = function (mark) {
        var icon = mark.icon;
        var imgUrl = mark.iconUrl;
        var size = new BMap.Size(icon.w, icon.h);
        var position = {
            imageOffset: new BMap.Size(-icon.l, -icon.t),
            infoWindowOffset: new BMap.Size(icon.lb + 5, 1),
            offset: new BMap.Size(icon.x, icon.h)
        };

        return new BMap.Icon(imgUrl, size, position);
    }
})();