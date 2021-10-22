/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Board.ts":
/*!*********************************!*\
  !*** ./src/components/Board.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\nclass Board {\n    constructor(containerTAG) {\n        /**\n         * @override\n         * @param x xCoord\n         * @param y yCoord\n         */\n        this.tileClickListen = (x, y) => { };\n        /**\n         * @override\n         * @param x xCoord\n         * @param y yCoord\n         */\n        this.tileMouseOverListener = (x, y) => { };\n        this.HTMLDivBordArray = [[]];\n        this.HTMLContainer = document.querySelector(containerTAG);\n        this.mouseOverEnable = false;\n    }\n    /** Creates path dashbord\n     *\n     * @name createContainer\n     * @function\n     * @global\n     * @param {Number} size size of container path ex: 4x4\n     * @see createContainer\n     * kierunek tablicy :\n     *      0\n     *      ↓\n     *      8\n     */\n    createContainer(size) {\n        for (let i = 0; i < size; i++) {\n            let divRow = document.createElement(\"div\");\n            this.HTMLDivBordArray.push([]);\n            for (let j = 0; j < size; j++) {\n                let divCell = document.createElement(\"div\");\n                this.HTMLDivBordArray[i].push(divCell);\n                divCell.classList.add(\"game\", \"game--tile\");\n                divCell.addEventListener(\"click\", () => {\n                    return this.tileClickListen(i, j);\n                });\n                divCell.addEventListener(\"mouseover\", () => {\n                    return this.tileMouseOverListener(i, j);\n                });\n                divRow.appendChild(divCell);\n            }\n            this.HTMLContainer.appendChild(divRow);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://kulki4/./src/components/Board.ts?");

/***/ }),

/***/ "./src/components/Dot.ts":
/*!*******************************!*\
  !*** ./src/components/Dot.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Dot)\n/* harmony export */ });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ \"./src/config.ts\");\n\nclass Dot {\n    /**\n     * @description Single dot class\n     * @bryndalski\n     */\n    constructor() {\n        /**\n         * Removes dot from HTML\n         */\n        this.byeBye = () => {\n            this.dot.remove();\n        };\n        /**\n         * Adds dot to HTML\n         */\n        this.guessWhoIsBack = () => this.dot;\n        this.colors = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].colors;\n        this.isSelected = false;\n        this.dot = document.createElement(\"div\");\n        this.dotColor = null;\n    }\n    /**\n     * @description creates single dot with random color from array\n     * @method\n     * @bryndalski\n     * @return dot<HTMLDivElement> dot\n     */\n    createDot() {\n        this.dot.classList.add(\"game--dot\");\n        this.dotColor =\n            this.colors[Math.floor(Math.random() * _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].colors.length)];\n        this.dot.style.backgroundColor = this.dotColor;\n        return this.dot;\n    }\n    select() {\n        if (!this.isSelected)\n            this.dot.classList.add(\"game--dotBIG\");\n        else\n            this.dot.classList.remove(\"game--dotBIG\");\n        this.isSelected = !this.isSelected;\n    }\n}\n\n\n//# sourceURL=webpack://kulki4/./src/components/Dot.ts?");

/***/ }),

/***/ "./src/components/DotMenager.ts":
/*!**************************************!*\
  !*** ./src/components/DotMenager.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DotMenager)\n/* harmony export */ });\n/* harmony import */ var _Dot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dot */ \"./src/components/Dot.ts\");\n\nclass DotMenager {\n    constructor(ContainerSelector, dotsNumber) {\n        this.dotPreviewContainer = document.querySelector(ContainerSelector);\n        this.dotArray = [];\n        this.dotsNumber = dotsNumber;\n    }\n    /**\n     * Allows to add specyfic dot number\n     * @param dotNumber\n     */\n    addDots() {\n        for (let i = 0; i < this.dotsNumber; i++) {\n            let dot = new _Dot__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n            this.dotArray.push(dot);\n            this.dotPreviewContainer.appendChild(dot.createDot());\n        }\n    }\n    releaseDots() {\n        this.dotArray.forEach((e) => e.byeBye());\n        this.addDots();\n    }\n    renderDot() { }\n}\n\n\n//# sourceURL=webpack://kulki4/./src/components/DotMenager.ts?");

/***/ }),

/***/ "./src/components/PathFinder.ts":
/*!**************************************!*\
  !*** ./src/components/PathFinder.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PathFinder)\n/* harmony export */ });\nclass PathFinder {\n    constructor(divArray) {\n        this.divArray = divArray;\n        this.findNumber = 1;\n        // this.startPoint = ;\n    }\n    /**\n     * Set path finding start algoritm\n     * @param x\n     * @param y\n     */\n    setStart(x, y) {\n        this.startPoint.x = x;\n        this.startPoint.y = y;\n        // this.numberArry[x][y] = \"START\";\n    }\n    /**\n     * Set path finding stop algoritm\n     * @param x\n     * @param y\n     */\n    setEnd(x, y) {\n        this.endPoint.x = x;\n        this.endPoint.y = y;\n        this.numberArry[x][y] = \"END\";\n    }\n    /**\n     * Converts div array to normal array\n     * @param gameArray\n     */\n    setFindingArray(gameArray) {\n        this.numberArry = gameArray.map((e, c) => {\n            this.pathArray[c] = [];\n            return e.map((ie, ic) => {\n                this.pathArray[c][ic] = null;\n                return ie.empty ? 0 : \"X\";\n            });\n        });\n        this.lastArray = JSON.stringify(this.numberArry);\n    }\n    /**\n     * Finds path from A to B\n     * @returns Array<[number,number] coordinates array\n     */\n    findPath() {\n        /**\n         * Drogi ja któty będziesz czytał to jutro\n         * nie wiem co tu napisałem ale ogólnie działa to tak\n         * że robi ci jebuntnie tablice i dodaje ic coraz większe mniejsze tablice\n         * w których są koordynaty poprzednich współtzędnych\n         *\n         * Powinno działać ale jesli komp zacznie mi\n         * robić spagetti z wykresków to wiedz że zjebałeś\n         * naprawdę nie wiem już co może to być ale to tak\n         *\n         *\n         */\n        this.numerize(this.startPoint.x, this.startPoint.y);\n        while (this.lastArray != JSON.stringify(this.numberArry)) {\n            this.lastArray = JSON.stringify(this.numberArry);\n            for (let c = 0; c < this.numberArry.length; c++) {\n                for (let ic = 0; ic < this.numberArry[c].length; ic++) {\n                    if (this.numberArry[c][ic] === this.findNumber)\n                        if (this.numerize(c, ic))\n                            return this.pathArray[c][ic];\n                }\n            }\n        }\n        return [];\n    }\n    /**\n     * Handles live path finding with returns etc\n     * @param x\n     * @param y\n     * @param gameArray\n     */\n    findLive(x, y, gameArray) {\n        this.findNumber = 1;\n        if (x === this.startPoint.x && y === this.startPoint.y)\n            return [];\n        else {\n            this.setFindingArray(gameArray);\n            this.setEnd(x, y);\n            console.log(this.findPath());\n        }\n    }\n    numerize(x, y) {\n        const directions = [\n            { x: -1, y: 0 },\n            { x: 0, y: -1 },\n            { x: 0, y: 1 },\n            { x: 1, y: 0 }, //jeden w dół\n        ];\n        try {\n            for (let i = 0; i < directions.length; i++) {\n                let e = directions[i];\n                if (this.numberArry[x + e.x][y + e.y] == \"END\")\n                    return true;\n                else if (this.numberArry[x + e.x][y + e.y] !== null) {\n                    this.numberArry[x + e.x][y + e.y] = this.findNumber + 1;\n                    this.pathArray[x + e.x][y + e.y] = [\n                        ...this.pathArray[x][y],\n                        [x + e.x, y + e.y],\n                    ];\n                }\n            }\n        }\n        catch (er) {\n            //TODO zakomentuj mnie\n            console.log(er);\n        }\n        return false;\n    }\n}\n\n\n//# sourceURL=webpack://kulki4/./src/components/PathFinder.ts?");

/***/ }),

/***/ "./src/components/SelectedCords.ts":
/*!*****************************************!*\
  !*** ./src/components/SelectedCords.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SelectedCords)\n/* harmony export */ });\nclass SelectedCords {\n    constructor() {\n        /**\n         * Get all values from class to one object\n         * @returns Object\n         */\n        this.getInfo = () => ({\n            isSelected: this.isSelected,\n            x: this.x,\n            y: this.y,\n        });\n        /**\n         * @description if one of coords is null returns true\n         */\n        this.nullCordsCheck = () => this.x === null || this.y === null ? true : false;\n        /**\n         * Returns X from coordinates\n         */\n        this.getX = () => this.x;\n        /**\n         * Returns Y from coordinates\n         */\n        this.getY = () => this.y;\n        (this.x = null), (this.y = null), (this.isSelected = false);\n    }\n    /**\n     * @description Clears all set coordinates and set is selected to false\n     */\n    clear() {\n        this.isSelected = false;\n        this.x = null;\n        this.y = null;\n    }\n    /**\n     * Allows user to set new coordinates\n     * @param isSelected<Boolean>\n     * @param x <number> x doord\n     * @param y <number> y coord\n     */\n    setNew(isSelected, x, y) {\n        this.isSelected = isSelected;\n        this.x = x;\n        this.y = y;\n    }\n}\n\n\n//# sourceURL=webpack://kulki4/./src/components/SelectedCords.ts?");

/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst CONFIG = {\n    colors: [\n        \"red\",\n        \"blue\",\n        \"green\",\n        \"yellow\",\n        \"orange\",\n        \"purple\",\n        \"cornflowerblue\",\n    ],\n    dotNumber: 3,\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CONFIG);\n\n\n//# sourceURL=webpack://kulki4/./src/config.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Board */ \"./src/components/Board.ts\");\n/* harmony import */ var _components_Dot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Dot */ \"./src/components/Dot.ts\");\n/* harmony import */ var _components_SelectedCords__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/SelectedCords */ \"./src/components/SelectedCords.ts\");\n/* harmony import */ var _components_DotMenager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/DotMenager */ \"./src/components/DotMenager.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ \"./src/config.ts\");\n/* harmony import */ var _components_PathFinder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/PathFinder */ \"./src/components/PathFinder.ts\");\n\n\n\n\n\n\nclass Game extends _components_Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor() {\n        super(\".game--board\");\n        /**\n         * Handles hod clicking\n         * @description Overwrittes method from Board\n         * @event\n         * @click\n         * @override Bord\n         * @param x\n         * @param y\n         * //?JEST SPOKO\n         */\n        this.tileClickListen = (x, y) => {\n            if (this.gameArray[x][y].empty && this.nowSelected.isSelected) {\n                this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()].dot.select();\n                this.mouseOverEnable = false;\n                this.moveDot(x, y);\n                this.nowSelected.clear();\n            }\n            else if (!this.gameArray[x][y].empty) {\n                if (this.nowSelected.isSelected)\n                    if (!this.nowSelected.nullCordsCheck())\n                        this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()].dot.select();\n                this.mouseOverEnable = true;\n                this.gameArray[x][y].dot.select();\n                this.nowSelected.setNew(true, x, y);\n                this.pathFinder.setStart(x, y);\n                this.mouseOverEnable = true;\n            }\n        };\n        /**\n         * Handle mouse move at each div\n         * @param x\n         * @param y\n         */\n        this.tileMouseOverListener = (x, y) => {\n            if (this.mouseOverEnable)\n                this.pathFinder.findLive(x, y, this.gameArray);\n        };\n        this.defaultValue = {\n            empty: true,\n            color: null,\n            dot: null,\n        };\n        //TODO tutaj zmieniaj ilość kropków\n        this.dotNumber = _config__WEBPACK_IMPORTED_MODULE_4__[\"default\"].dotNumber;\n        this.gameArray = [];\n        this.nowSelected = new _components_SelectedCords__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n        this.dotMenager = new _components_DotMenager__WEBPACK_IMPORTED_MODULE_3__[\"default\"](\".dotPreview\", this.dotNumber);\n        this.pathFinder = new _components_PathFinder__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this.HTMLDivBordArray);\n        //!!!! TO ZAWSZE OSTATNIE\n        this.init();\n    }\n    /**\n     * Inits whole class\n     */\n    init() {\n        this.createContainer(9);\n        for (let i = 0; i < 9; i++) {\n            this.gameArray[i] = [];\n            for (let j = 0; j < 9; j++) {\n                this.gameArray[i].push(this.defaultValue);\n            }\n        }\n        this.addDots();\n    }\n    /**\n     * Allows to add dot numbe\n     *\n     */\n    addDots() {\n        // console.log(this, this.dotMenager);\n        for (let i = 0; i < this.dotNumber; i++) {\n            let coords = {\n                x: Math.floor(Math.random() * 9),\n                y: Math.floor(Math.random() * 9),\n            };\n            if (this.gameArray[coords.x][coords.y].empty) {\n                let dot = this.dotMenager.dotArray.length === 0\n                    ? new _components_Dot__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\n                    : this.dotMenager.dotArray[i];\n                if (this.dotMenager.dotArray.length === 0)\n                    dot.createDot();\n                this.HTMLDivBordArray[coords.x][coords.y].appendChild(dot.guessWhoIsBack());\n                this.gameArray[coords.x][coords.y] = {\n                    empty: false,\n                    color: dot.dotColor,\n                    dot,\n                };\n            }\n            else {\n                i--;\n            }\n        }\n        // console.log(this.dotMenager);\n        this.dotMenager.releaseDots();\n    }\n    /**\n     * Moves dot from one place to another :p\n     * @param x\n     * @param y\n     */\n    moveDot(x, y) {\n        let temporatyBox = this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()];\n        this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()].dot.byeBye();\n        this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()] =\n            this.defaultValue;\n        this.gameArray[x][y] = temporatyBox;\n        this.HTMLDivBordArray[x][y].appendChild(this.gameArray[x][y].dot.guessWhoIsBack());\n    }\n}\nnew Game();\n\n\n//# sourceURL=webpack://kulki4/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;