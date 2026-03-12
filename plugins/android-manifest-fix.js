const { AndroidConfig, withAndroidManifest } = require("@expo/config-plugins");

const { getMainApplicationOrThrow } = AndroidConfig.Manifest;

function addNotificationColorMetaData(androidManifest) {
  const { manifest } = androidManifest;

  if (!Array.isArray(manifest["application"])) {
    console.warn("No application array in manifest");
    return androidManifest;
  }

  const application = getMainApplicationOrThrow(androidManifest);

  // Ensure meta-data array exists
  if (!Array.isArray(application["meta-data"])) {
    application["meta-data"] = [];
  }

  // Check if the meta-data already exists
  const existingMetaData = application["meta-data"].find(
    (item) => item.$["android:name"] === "com.google.firebase.messaging.default_notification_color"
  );

  if (!existingMetaData) {
    // Add the meta-data with tools:replace attribute
    application["meta-data"].push({
      $: {
        "android:name": "com.google.firebase.messaging.default_notification_color",
        "android:resource": "@color/notification_icon_color",
        "tools:replace": "android:resource"
      }
    });
  } else {
    // Update existing meta-data to include tools:replace
    existingMetaData.$ = {
      ...existingMetaData.$,
      "tools:replace": "android:resource"
    };
  }

  return androidManifest;
}

module.exports = function withNotificationColorFix(config) {
  return withAndroidManifest(config, (config) => {
    config.modResults = addNotificationColorMetaData(config.modResults);
    return config;
  });
};