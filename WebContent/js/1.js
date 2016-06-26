
		jQuery('#allSend').click(
				function() {
					var paraData = {
						siteId : jQuery('#siteId').val(),
						deviceTypeNo : 2,
						flag : '正常'
					// 不查1托30主桩子
					};
					Dialog.confirm('提示：确认一键充电吗?', function() {
						var  html='';
						var GrooveNo = 0;
						var parkingPosition = jQuery('input[name="allPostion"]:checked').val();
						var CtrlOrdertype='0';
						jQuery.ajax({
							type : "POST",
							url : contextPath
									+ '/stake/device/ajaxDevice.htm?t='
									+ new Date().getTime(),
							data : 'paraData='+ encodeURI(JSON.stringify(paraData)),
							async : true,
							dataType : 'json',
							success : function(data) {
								
								if (data){
									for (var i=0;i<data.length;i++) {
										
										deviceNo=data[i].deviceNo;
										//alert(data[i].deviceNo)
										deviceId = data[i].id; 
										if ("旗翔1托2" == data[i].chargePort) {
											if (i == 1) {
												GrooveNo = 1;
											}
										} else {// 旗翔1托4
											if (i == 1) {
												GrooveNo = 2;
											} else if (i == 2) {
												GrooveNo = 1;
											} else if (i == 3) {
												GrooveNo = 3;
											}
										}
										//alert(GrooveNo+parkingPosition)
										jQuery.ajax({
											type : "POST",
											url : contextPath + "/stake/command/ajaxSendStakeCmd.htm?",
											data : "GrooveNo=" + GrooveNo + "&parkingPosition="
													+ parkingPosition + "&deviceId=" + list[i].id
													+ "&CtrlOrdertype=" + CtrlOrdertype,
											async : true,
											success : function(data) {
												var map = eval('(' + data + ')');
												html+= deviceNo+map.info+'<br>';
												jQuery('#result').html(html);
											},
											error : function() {
												Dialog.alert("提示：操作失败");
											}
										});
									}
								}
							},
							error : function() {
							}
						});
					});
				});
