## tempedit

tempeditは、一時的にエディターを起動することができるコマンドラインのツールです。  
AIのプロンプトを書くようなときや、シェルスクリプトの途中で長文を書くようなときに最適です。

## インストール

```bash
$ npm install --global @kokiito0926/tempedit
```

## 使用方法

デフォルトでは、code --waitでエディタが開きます。  
エディタを閉じると、その内容は標準出力に書き出されます。

```bash
$ tempedit
```

エディタで書いた内容は、標準出力に書き出されます。

```bash
$ tempedit | cat
```

--editorのオプションで、エディタを変更することができます。

```bash
$ tempedit --editor "vim"
```

--nameのオプションで、ファイル名を変更することができます。

```bash
$ tempedit --name "example.md"
```

--extensionのオプションで、ファイルの拡張子を変更することができます。

```bash
$ tempedit --extension "md"
```

--templateのオプションで、テンプレートのファイルを読み込ませることができます。

```bash
$ tempedit --template ./template.txt
```

## ライセンス

[MIT](LICENSE)
