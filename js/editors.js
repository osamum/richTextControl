(function () {

    var $id = function (id) { return document.getElementById(id); };

    var richEditor = {
        STORAGE_KEY: "myRichText",
        editFlag : true,
        ctrl_editArea: null,
        checkSelectionText: function () {
            var selectionFlag = (
                    document.getSelection().toString().length > 0);
            if (!selectionFlag) {
                alert("文字が選択されていません。\n文字を選択してください。");
            }
            return selectionFlag;
        },
        setControls: function () {
            this.ctrl_editArea = $id("editArea");
            return this;
        },
        loadData: function () {
            var savedContent = localStorage.getItem(richEditor.STORAGE_KEY);
            if (savedContent) richEditor.ctrl_editArea.innerHTML = savedContent;
            return this;
        },
        setHandlers: function () {

            //保存ボタンがクリックされたら
            $id("saveButton").addEventListener("click", function () {

                richEditor.editFlag = (!richEditor.editFlag);
                richEditor.ctrl_editArea.contentEditable = richEditor.editFlag;

                if (navigator.onLine) {
                    localStorage.removeItem(richEditor.STORAGE_KEY);
                    alert("オンラインストレージに保存しました。");
                }
                else {
                    //コンテンツの保存
                    localStorage.setItem(richEditor.STORAGE_KEY, richEditor.ctrl_editArea.innerHTML);
                    alert("ローカルストレージに保存しました。");
                }
            });

            //フォントサイズを指定するドロップダウンリストのイベントハンドラ        
            $id("fontSizeSelecter")
                .addEventListener("change", function () {
                    if (richEditor.checkSelectionText()) {
                        document.execCommand('fontSize',
                           false, this.value);
                    }
                });

            //フォントカラーを指定するドロップダウンリストのイベントハンドラ        
            $id("fontColorSelecter")
               .addEventListener("change", function () {
                   if (richEditor.checkSelectionText()) {
                       document.execCommand('ForeColor',
                          false, this.value);
                   }
               });

            //フォント名を指定するドロップダウンリストのイベントハンドラ        
            $id("fontNameSelecter")
               .addEventListener("change", function () {
                   if (richEditor.checkSelectionText()) {
                       document.execCommand('fontName',
                         false, this.value);
                   }
               });

            //[太字] ボタン        
            $id("boldButton")
               .addEventListener("click", function () {
                   if (richEditor.checkSelectionText()) {
                       document.execCommand("bold", false);
                   }
               });

            //[下線] ボタン        
            $id("underLineButton")
               .addEventListener("click", function () {
                   if (richEditor.checkSelectionText()) {
                       document.execCommand("underline", false);
                   }
               });

            //[イタリック] ボタン        
            $id("ialicBotton")
              .addEventListener("click", function () {
                  if (richEditor.checkSelectionText()) {
                      document.execCommand("italic", false);
                  }
              });

            $id("showPicbaseButton").addEventListener("click", function () {
                $id("insertPicBase").style.visibility = "visible";
            });

            $id("showUrlbaseButton").addEventListener("click", function () {
                $id("insertUrlBase").style.visibility = "visible";
            });


            //画像を挿入するボタンのイベントハンドラ        
            $id("isertImageButton")
                .addEventListener("click", function () {
                    if (richEditor.checkSelectionText()) {
                        var url = $id("imageUrlText").value;
                        document.execCommand("insertImage", false, url);
                        $id("insertPicBase").style.visibility = "hidden";
                    }
                });

            $id("insertPicBase").addEventListener("click", function () {
                this.style.visibility = "hidden";
            });

            //リンクを生成するボタンのイベントハンドラ        
            $id("mkLinkButton")
                .addEventListener("click", function () {
                    if (richEditor.checkSelectionText()) {
                        var url = $id("urlText").value;
                        document.execCommand("createLink", false, url);
                        $id("insertUrlBase").style.visibility = "hidden";
                    }
                });

            $id("insertUrlBase").addEventListener("click", function () {
                this.style.visibility = "hidden";
            })

            window.addEventListener("online", function (e) {
                alert("ネットワークに接続しました。");
            }, false);


            window.addEventListener("offline", function (e) {
                alert("ネットワークが切断されました。");
            }, false);


            return this;
        },
        getCenterPostion : function(containerWidth, itemWidth) {
            return (containerWidth / 2) - (itemWidth / 2);
        }
    };


    document.addEventListener("DOMContentLoaded", function () {
        richEditor.setControls().loadData().setHandlers();

    });

}());