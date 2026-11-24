#!/bin/sh
# Tạo lại icon và ảnh chia sẻ bằng Chrome headless (macOS). Chạy từ thư mục gốc của repo.
#
#   tools/make-images.sh icons
#       assets/icons/icon.svg, tools/icon-maskable.svg  ->  các file PNG trong assets/icons/
#
#   tools/make-images.sh og <file-ra.png> "<nhãn>" "<tên>" "<dòng phụ>" "<nhãn cuối>"
#       ảnh 1200×630 hiện khi dán link, theo mẫu tools/og.html. Ví dụ:
#       tools/make-images.sh og books/nha-gia-kim/og.png "Sổ tay đọc sách" "Nhà Giả Kim" "Paulo Coelho" "Tóm tắt"
set -e
cd "$(dirname "$0")/.."
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
shot() { "$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 "$@" 2>/dev/null; }

case "$1" in
  icons)
    TMP=$(mktemp -d)
    shot --default-background-color=00000000 --window-size=512,512 --screenshot="$TMP/any.png" "file://$PWD/assets/icons/icon.svg"
    shot --window-size=512,512 --screenshot="$TMP/full.png" "file://$PWD/tools/icon-maskable.svg"
    cp "$TMP/any.png"  assets/icons/icon-512.png
    cp "$TMP/full.png" assets/icons/icon-maskable-512.png
    sips -s format png -z 192 192 "$TMP/any.png"  --out assets/icons/icon-192.png >/dev/null
    sips -s format png -z 32 32   "$TMP/any.png"  --out assets/icons/icon-32.png >/dev/null
    sips -s format png -z 180 180 "$TMP/full.png" --out assets/icons/apple-touch-icon.png >/dev/null
    rm -rf "$TMP"
    ls -l assets/icons
    ;;
  og)
    OUT="$2"
    Q=$(python3 -c 'import sys,urllib.parse as u; print(u.urlencode(dict(zip(["label","title","sub","meta"], sys.argv[1:]))))' "$3" "$4" "$5" "$6")
    shot --window-size=1200,630 --virtual-time-budget=8000 --screenshot="$OUT" "file://$PWD/tools/og.html?$Q"
    ls -l "$OUT"
    ;;
  *)
    sed -n '2,10p' "$0"; exit 1 ;;
esac
