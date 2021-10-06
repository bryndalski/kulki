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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\nclass Board {\n    constructor(containerTAG) {\n        /**\n         * @override\n         * @param x xCoord\n         * @param y yCoord\n         */\n        this.tileClickListen = (x, y) => { };\n        this.HTMLDivBordArray = [[]];\n        this.HTMLContainer = document.querySelector(containerTAG);\n    }\n    /** Creates path dashbord\n     *\n     * @name createContainer\n     * @function\n     * @global\n     * @param {Number} size size of container path ex: 4x4\n     * @see createContainer\n     * kierunek tablicy :\n     *      0\n     *      ↓\n     *      8\n     */\n    createContainer(size) {\n        for (let i = 0; i < size; i++) {\n            let divRow = document.createElement(\"div\");\n            this.HTMLDivBordArray.push([]);\n            for (let j = 0; j < size; j++) {\n                let divCell = document.createElement(\"div\");\n                this.HTMLDivBordArray[i].push(divCell);\n                divCell.classList.add(\"game\", \"game--tile\");\n                divCell.addEventListener(\"click\", () => {\n                    return this.tileClickListen(i, j);\n                });\n                //TODO REMOVE ME\n                // divCell.style.color = \"white\";\n                // divCell.innerText = `${i} x ${j}`;\n                divRow.appendChild(divCell);\n            }\n            this.HTMLContainer.appendChild(divRow);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://kulki4/./src/components/Board.ts?");

/***/ }),

/***/ "./src/components/Dot.ts":
/*!*******************************!*\
  !*** ./src/components/Dot.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Dot)\n/* harmony export */ });\nclass Dot {\n    /**\n     * @description Single dot class\n     * @bryndalski\n     */\n    constructor() {\n        /**\n         * Removes dot from HTML\n         */\n        this.byeBye = () => {\n            this.dot.remove();\n        };\n        /**\n         * Adds dot to HTML\n         */\n        this.guessWhoIsBack = () => this.dot;\n        this.colors = [\"orange\", \"green\", \"blue\"];\n        this.isSelected = false;\n        this.dot = document.createElement(\"div\");\n        this.dotColor = null;\n    }\n    /**\n     * @description creates single dot with random color from array\n     * @method\n     * @bryndalski\n     * @return dot<HTMLDivElement> dot\n     */\n    createDot() {\n        this.dot.classList.add(\"game--dot\");\n        this.dotColor = this.colors[Math.floor(Math.random() * 3)];\n        this.dot.style.backgroundColor = this.dotColor;\n        return this.dot;\n    }\n    select() {\n        if (!this.isSelected)\n            this.dot.classList.add(\"game--dotBIG\");\n        else\n            this.dot.classList.remove(\"game--dotBIG\");\n        this.isSelected = !this.isSelected;\n    }\n}\n\n\n//# sourceURL=webpack://kulki4/./src/components/Dot.ts?");

/***/ }),

/***/ "./src/components/SelectedCords.ts":
/*!*****************************************!*\
  !*** ./src/components/SelectedCords.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SelectedCords)\n/* harmony export */ });\nclass SelectedCords {\n    constructor() {\n        /**\n         * Get all values from class to one object\n         * @returns Object\n         */\n        this.getInfo = () => ({\n            isSelected: this.isSelected,\n            x: this.x,\n            y: this.y,\n        });\n        /**\n         * @description if one of coords is null returns true\n         */\n        this.nullCordsCheck = () => this.x === null || this.y === null ? true : false;\n        /**\n         * Returns X from coordinates\n         */\n        this.getX = () => this.x;\n        /**\n         * Returns Y from coordinates\n         */\n        this.getY = () => this.y;\n        (this.x = null), (this.y = null), (this.isSelected = false);\n    }\n    /**\n     * @description Clears all set coordinates and set is selected to false\n     */\n    clear() {\n        this.isSelected = false;\n        this.x = null;\n        this.y = null;\n    }\n    /**\n     * Allows user to set new coordinates\n     * @param isSelected<Boolean>\n     * @param x <number> x doord\n     * @param y <number> y coord\n     */\n    setNew(isSelected, x, y) {\n        this.isSelected = isSelected;\n        this.x = x;\n        this.y = y;\n    }\n}\n\n\n//# sourceURL=webpack://kulki4/./src/components/SelectedCords.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Board */ \"./src/components/Board.ts\");\n/* harmony import */ var _components_Dot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Dot */ \"./src/components/Dot.ts\");\n/* harmony import */ var _components_SelectedCords__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/SelectedCords */ \"./src/components/SelectedCords.ts\");\n\n\n\nclass Game extends _components_Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor() {\n        super(\".game--board\");\n        /**\n         * Handles hod clicking\n         * @description Overwrittes method from Board\n         * @event\n         * @click\n         * @override Bord\n         * @param x\n         * @param y\n         */\n        this.tileClickListen = (x, y) => {\n            if (this.gameArray[x][y].empty && this.nowSelected.isSelected) {\n                this.moveDot(x, y);\n                this.nowSelected.clear();\n            }\n            if (!this.gameArray[x][y].empty) {\n                if (this.nowSelected.isSelected)\n                    if (!this.nowSelected.nullCordsCheck())\n                        this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()].dot.select();\n                this.gameArray[x][y].dot.select();\n                this.nowSelected.setNew(true, x, y);\n            }\n        };\n        this.defaultValue = {\n            empty: true,\n            color: null,\n            dot: null,\n        };\n        this.gameArray = [];\n        this.init();\n        this.nowSelected = new _components_SelectedCords__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    }\n    init() {\n        this.createContainer(9);\n        for (let i = 0; i < 9; i++) {\n            this.gameArray[i] = [];\n            for (let j = 0; j < 9; j++) {\n                this.gameArray[i].push(this.defaultValue);\n            }\n        }\n        this.addDots(3);\n    }\n    /**\n     * Allows to add specyfic dot number\n     * @param dotNumber\n     */\n    addDots(dotNumber) {\n        for (let i = 0; i < dotNumber; i++) {\n            let coords = {\n                x: Math.floor(Math.random() * 9),\n                y: Math.floor(Math.random() * 9),\n            };\n            if (this.gameArray[coords.x][coords.y].empty) {\n                let dot = new _components_Dot__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n                this.HTMLDivBordArray[coords.x][coords.y].appendChild(dot.createDot());\n                this.gameArray[coords.x][coords.y] = {\n                    empty: false,\n                    color: dot.dotColor,\n                    dot,\n                };\n            }\n            else {\n                i--;\n            }\n        }\n    }\n    moveDot(x, y) {\n        let temporatyBox = this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()];\n        this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()].dot.byeBye();\n        this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()] =\n            this.defaultValue;\n        this.gameArray[x][y] = temporatyBox;\n        this.HTMLDivBordArray[x][y].appendChild(this.gameArray[x][y].dot.guessWhoIsBack());\n    }\n}\nnew Game();\n\n\n//# sourceURL=webpack://kulki4/./src/index.ts?");

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