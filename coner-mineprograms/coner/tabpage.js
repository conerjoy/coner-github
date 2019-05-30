import tabbar from '../coner/tabbar.js';
import teacherTabLessonPreparation from '../pages/tabbar/teacher/lesson-preparation/lesson-preparation.js';
import teacherTabLevel from '../pages/tabbar/teacher/level/level.js';
import teacherTabMine from '../pages/tabbar/teacher/mine/mine.js';
import teacherTabTeachLesson from '../pages/tabbar/teacher/teach-lesson/teach-lesson.js';
import studentTabGoClass from '../pages/tabbar/student/go-class/go-class.js';
import studentTabHomeWork from '../pages/tabbar/student/homework/homework.js';
import studentTabMine from '../pages/tabbar/student/mine/mine.js';
import studentTabTest from '../pages/tabbar/student/test/test.js';

/**
 * 获取tab页面数据
 */
function getCurrentAllTabs() {
  let currentAllTabs = [{
    name: '老师备课页面',
    path: '/pages/tabbar/teacher/lesson-preparation/lesson-preparation',
    object: teacherTabLessonPreparation
  }, {
    name: '老师职称页面',
    path: '/pages/tabbar/teacher/level/level',
    object: teacherTabLevel
  }, {
    name: '老师信息页面',
    path: '/pages/tabbar/teacher/mine/mine',
    object: teacherTabMine
  }, {
    name: '老师教课页面',
    path: '/pages/tabbar/teacher/teach-lesson/teach-lesson',
    object: teacherTabTeachLesson
  }, {
    name: '学生上课页面',
    path: '/pages/tabbar/student/go-class/go-class',
    object: studentTabGoClass
  }, {
    name: '学生课后作业页面',
    path: '/pages/tabbar/student/homework/homework',
    object: studentTabHomeWork
  }, {
    name: '学生信息页面',
    path: '/pages/tabbar/student/mine/mine',
    object: studentTabMine
  }, {
    name: '学生考试页面',
    path: '/pages/tabbar/student/test/test',
    object: studentTabTest
  }];
  return currentAllTabs;
}

/**
 * 解析tab页数据
 */
function parseTabData(index, indexTab) {
  let currentTabs = getCurrentAllTabs();
  for (let item in currentTabs) {
    if (indexTab.pagePath == currentTabs[item].path) {
      return currentTabs[item].object;
    }
  }
  return currentTabs[0].object;
}

/**
 * 校验出正确的tabpage
 */
function checkTabPage(index) {
	let page = {};
	let allTabs = tabbar.getTabbarData(); // tabbar.js中配置的tabbar信息
	let indexTab = allTabs.data[index]; // 当前选中的tabbarItem信息
	let currentTab = parseTabData(index, indexTab); // 得到tabbar上面页面的对象
	if (currentTab != undefined && currentTab.createPage != undefined) {
		page = currentTab.createPage();
		if (page != undefined) {
			page.title = indexTab.text;
			if (page.data == undefined) {
				page.data = {};
			}
			page.data = Object.assign(page.data, {
				tabbarData: allTabs
			});
			if (this != undefined) {
				this.data = Object.assign(this.data, {
					tabbarData: allTabs
				});
			}
		}
	}
	return page;
}

/**
 * 将中间页没有的方法添加进中间页
 */
function perfectElement(page) {
	for (let key in page) {
		this[key] = page[key];
	}
}

export default function (options) {
	let index = options.index;
	let page = checkTabPage(index);
	return {
		checkTabPage: checkTabPage,
		perfectElement: perfectElement,

		index: options.index,
		onLoad(options) {
			let page = this.checkTabPage(this.index);
			this.perfectElement(page);
			// page.onLoad(options);
			page.onLoad.call(this, options);
		}, onReady() {
			let page = this.checkTabPage(this.index);
			this.perfectElement(page);
			page.onReady.call(this);
		}, onShows() {
			let page = this.checkTabPage(this.index);
			this.perfectElement(page);
			page.onShows.call(this);
		}, onHides() {
			let page = this.checkTabPage(this.index);
			this.perfectElement(page);
			page.onHides.call(this);
		}, onUnloads() {
			let page = this.checkTabPage(this.index);
			this.perfectElement(page);
			page.onUnloads.call(this);
		}
	};
}