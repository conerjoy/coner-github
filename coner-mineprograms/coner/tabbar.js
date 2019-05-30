export default {
  getTabbarData: getTabbarData,
  tabbarData: {
    teacherLisr: {
      target: 'teacher',
      data: [{
          "mainPagePath": "/pages/tabbar/tabpage/firsttab/firsttab",
          "pagePath": "/pages/tabbar/teacher/teach-lesson/teach-lesson",
          "text": "教课",
          "iconPath": "/images/icon_teachclass_normal.png",
          "selectedIconPath": "/images/icon_teachclass_select.png"
        },
        {
          "mainPagePath": "/pages/tabbar/tabpage/secondtab/secondtab",
          "pagePath": "/pages/tabbar/teacher/lesson-preparation/lesson-preparation",
          "text": "备课",
          "iconPath": "/images/icon_lessonpreparation_normal.png",
          "selectedIconPath": "/images/icon_lessonpreparation_select.png"
        },
        {
          "mainPagePath": "/pages/tabbar/tabpage/thirdtab/thirdtab",
          "pagePath": "/pages/tabbar/teacher/level/level",
          "text": "教师职称",
          "iconPath": "/images/icon_level_normal.png",
          "selectedIconPath": "/images/icon_level_select.png"
        },
        {
          "mainPagePath": "/pages/tabbar/tabpage/fourthtab/fourthtab",
          "pagePath": "/pages/tabbar/teacher/mine/mine",
          "text": "我的",
          "iconPath": "/images/icon_mine_normal.png",
          "selectedIconPath": "/images/icon_mine_select.png"
        }
      ]
    },
    studentLisr: {
      target: 'student',
      data: [{
          "mainPagePath": "/pages/tabbar/tabpage/firsttab/firsttab",
          "pagePath": "/pages/tabbar/student/go-class/go-class",
          "text": "上课",
          "iconPath": "/images/icon_goclass_normal.png",
          "selectedIconPath": "/images/icon_goclass_select.png"
        },
        {
          "mainPagePath": "/pages/tabbar/tabpage/secondtab/secondtab",
          "pagePath": "/pages/tabbar/student/test/test",
          "text": "考试",
          "iconPath": "/images/icon_test_normal.png",
          "selectedIconPath": "/images/icon_test_select.png"
        },
        {
          "mainPagePath": "/pages/tabbar/tabpage/thirdtab/thirdtab",
          "pagePath": "/pages/tabbar/student/homework/homework",
          "text": "课后作业",
          "iconPath": "/images/icon_homework_normal.png",
          "selectedIconPath": "/images/icon_homework_select.png"
        },
        {
          "mainPagePath": "/pages/tabbar/tabpage/fourthtab/fourthtab",
          "pagePath": "/pages/tabbar/student/mine/mine",
          "text": "我的",
          "iconPath": "/images/icon_mine_normal.png",
          "selectedIconPath": "/images/icon_mine_select.png"
        }
      ]
    },
  }
}

function getTabbarData() {
  let app = getApp();
  // 获取身份信息
  let status = app.getStorageValueSync({
    storage: 'userData',
    key: 'status'
  });
  let realList = {};
  // 根据身份显示不一样的title
  if (status != undefined && status != '') {
    let realList = [];
    if (status == '0') {
      // 身份为教师
      realList = this.tabbarData.teacherLisr;
    } else if (status == '1') {
      // 身份为学生
      realList = this.tabbarData.studentLisr;
    }
    return realList;
  } else {
    return this.tabbarData.teacherLisr;
  }
}