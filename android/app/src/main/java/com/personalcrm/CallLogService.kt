package com.personalcrm

import android.content.Intent
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.jstasks.HeadlessJsTaskConfig
import com.facebook.react.bridge.Arguments

class CallLogService : HeadlessJsTaskService() {

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val taskData = Arguments.createMap()
        taskData.putBoolean("background", true)

        val taskConfig = HeadlessJsTaskConfig(
            "CallLogBackgroundTask",
            taskData,
            5000,
            true
        )
        startTask(taskConfig)
        return START_NOT_STICKY
    }
}