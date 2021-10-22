"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Board_1 = require("./components/Board");
var Dot_1 = require("./components/Dot");
var SelectedCords_1 = require("./components/SelectedCords");
var DotMenager_1 = require("./components/DotMenager");
var config_1 = require("./config");
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this, ".game--board") || this;
        /**
         * Handles hod clicking
         * @description Overwrittes method from Board
         * @event
         * @click
         * @override Bord
         * @param x
         * @param y
         * //?JEST SPOKO
         */
        _this.tileClickListen = function (x, y) {
            console.log(_this.nowSelected);
            if (_this.gameArray[x][y].empty && _this.nowSelected.isSelected) {
                _this.gameArray[_this.nowSelected.getX()][_this.nowSelected.getY()].dot.select();
                _this.moveDot(x, y);
                _this.nowSelected.clear();
            }
            else if (!_this.gameArray[x][y].empty) {
                console.log(_this.nowSelected.isSelected, _this.nowSelected.getX(), _this.nowSelected.getY());
                if (_this.nowSelected.isSelected)
                    if (!_this.nowSelected.nullCordsCheck())
                        _this.gameArray[_this.nowSelected.getX()][_this.nowSelected.getY()].dot.select();
                _this.gameArray[x][y].dot.select();
                _this.nowSelected.setNew(true, x, y);
            }
        };
        _this.defaultValue = {
            empty: true,
            color: null,
            dot: null
        };
        //TODO tutaj zmieniaj ilość kropków
        _this.dotNumber = config_1["default"].dotNumber;
        _this.gameArray = [];
        _this.nowSelected = new SelectedCords_1["default"]();
        _this.dotMenager = new DotMenager_1["default"](".dotPreview", _this.dotNumber);
        //!!!! TO ZAWSZE OSTATNIE
        _this.init();
        return _this;
    }
    /**
     * Inits whole class
     */
    Game.prototype.init = function () {
        this.createContainer(9);
        for (var i = 0; i < 9; i++) {
            this.gameArray[i] = [];
            for (var j = 0; j < 9; j++) {
                this.gameArray[i].push(this.defaultValue);
            }
        }
        this.addDots();
    };
    /**
     * Allows to add dot numbe
     *
     */
    Game.prototype.addDots = function () {
        // console.log(this, this.dotMenager);
        for (var i = 0; i < this.dotNumber; i++) {
            var coords = {
                x: Math.floor(Math.random() * 9),
                y: Math.floor(Math.random() * 9)
            };
            if (this.gameArray[coords.x][coords.y].empty) {
                var dot = this.dotMenager.dotArray.length === 0
                    ? new Dot_1["default"]()
                    : this.dotMenager.dotArray[i];
                if (this.dotMenager.dotArray.length === 0)
                    dot.createDot();
                this.HTMLDivBordArray[coords.x][coords.y].appendChild(dot.guessWhoIsBack());
                this.gameArray[coords.x][coords.y] = {
                    empty: false,
                    color: dot.dotColor,
                    dot: dot
                };
            }
            else {
                i--;
            }
        }
        // console.log(this.dotMenager);
        this.dotMenager.releaseDots();
    };
    /**
     * Moves dot from one place to another :p
     * @param x
     * @param y
     */
    Game.prototype.moveDot = function (x, y) {
        var temporatyBox = this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()];
        this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()].dot.byeBye();
        this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()] =
            this.defaultValue;
        this.gameArray[x][y] = temporatyBox;
        this.HTMLDivBordArray[x][y].appendChild(this.gameArray[x][y].dot.guessWhoIsBack());
    };
    return Game;
}(Board_1["default"]));
new Game();
