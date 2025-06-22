import it.csi.alm.Constants
 
def postBuildCommands(build_map) {
  sh """
  echo 'Environment: ${environment}'
	if [ -d ${WORKSPACE}/dist_arch ];then
	rm -rf ${WORKSPACE}/dist_arch
	fi
	mkdir -p ${WORKSPACE}/dist_arch
  cd ${WORKSPACE}/dist
  tar cvf ${WORKSPACE}/dist_arch/${build_map.productName}-${build_map.componentName}-${build_map.componentVersion}.tar *
  cp ${WORKSPACE}/dist_arch/${build_map.productName}-${build_map.componentName}-${build_map.componentVersion}.tar ${WORKSPACE}/dist_arch/${build_map.productName}-${build_map.componentName}-latest.tar
  """
}
 
return this