const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withReleaseKeystore(config) {
  config = withAppBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      let contents = config.modResults.contents;

      // Add signing properties loading at the top of the file (before android block)
      const signingPropsLoader = `
// Load signing properties for release builds
def signingPropsFile = rootProject.file('../android-signing.properties')
def signingProps = new Properties()
if (signingPropsFile.exists()) {
    signingProps.load(new FileInputStream(signingPropsFile))
}
`;

      // Add the signing properties loader before android block if not already present
      if (!contents.includes('android-signing.properties')) {
        contents = contents.replace(
          /android\s*\{/,
          signingPropsLoader + '\nandroid {'
        );
      }

      // Add release signing config to signingConfigs block
      const releaseSigningConfig = `        release {
            if (signingPropsFile.exists()) {
                storeFile file(signingProps['RELEASE_STORE_FILE'])
                storePassword signingProps['RELEASE_STORE_PASSWORD']
                keyAlias signingProps['RELEASE_KEY_ALIAS']
                keyPassword signingProps['RELEASE_KEY_PASSWORD']
            }
        }`;

      // Check if signingConfigs block exists
      if (contents.match(/signingConfigs\s*\{/)) {
        // Add release config after debug config if it doesn't exist
        if (!contents.match(/signingConfigs\s*\{[^}]*release\s*\{/s)) {
          contents = contents.replace(
            /(signingConfigs\s*\{[^}]*)(debug\s*\{[^}]*\})/s,
            `$1$2\n${releaseSigningConfig}`
          );
        }
      } else {
        // Add signingConfigs block before buildTypes
        contents = contents.replace(
          /(\s*)(buildTypes\s*\{)/,
          `$1signingConfigs {\n${releaseSigningConfig}\n    }\n\n$1$2`
        );
      }

      // Update release buildType to use release signing config
      // This regex matches the release buildType and replaces signingConfig line
      contents = contents.replace(
        /(release\s*\{[^\}]*?)(\n\s*\/\/[^\n]*\n\s*\/\/[^\n]*\n\s*)signingConfig\s+signingConfigs\.debug/s,
        '$1$2signingConfig signingConfigs.release'
      );

      // Alternative: if the pattern above didn't match, try simpler pattern
      if (contents.includes('release {') && contents.match(/release\s*\{[^}]*signingConfig\s+signingConfigs\.debug/s)) {
        contents = contents.replace(
          /(release\s*\{[^}]*?)signingConfig\s+signingConfigs\.debug/s,
          '$1signingConfig signingConfigs.release'
        );
      }

      config.modResults.contents = contents;
    }
    return config;
  });

  return config;
};
