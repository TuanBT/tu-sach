#!/usr/bin/env python3
"""Tạo nền bản đồ thế giới cho trang Bản đồ hành trình: assets/js/map-land.js

    python3 tools/make-map-land.py <land-110m.json>

<land-110m.json> là dữ liệu đất liền của gói world-atlas (Natural Earth 1:110m, miền công cộng):
    curl -o land-110m.json https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json
Để file này ở thư mục tạm, không đưa vào repo. Chỉ cần chạy lại khi muốn đổi phép chiếu hay độ chi tiết.

Phép chiếu: trụ đều có giãn ngang theo vĩ độ 45 độ, hợp với các cuốn sách diễn ra ở Bắc bán cầu:
    x = (kinh độ + 180) * K * C,  y = (90 - vĩ độ) * K
assets/js/map.js dùng đúng K, C ghi trong file sinh ra để đặt các điểm lên bản đồ.
"""
import json, math, sys, os

K = 4.0
C = round(math.cos(math.radians(45)), 4)
LAT_MIN, LAT_MAX = -45, 84          # bỏ Nam Cực và vùng cực nam, không sách nào cần
STEP = 0.6                          # bỏ các điểm cách điểm trước dưới 0,6 đơn vị (đủ nét ở mức phóng to 8 lần)


def project(lon, lat):
    return (lon + 180) * K * C, (90 - lat) * K


def main(src, out):
    tj = json.load(open(src, encoding="utf-8"))
    (sx, sy), (tx, ty) = tj["transform"]["scale"], tj["transform"]["translate"]
    arcs = []
    for arc in tj["arcs"]:
        x = y = 0
        pts = []
        for dx, dy in arc:
            x += dx
            y += dy
            pts.append((x * sx + tx, y * sy + ty))
        arcs.append(pts)

    def ring_points(ring):
        pts = []
        for i in ring:
            a = arcs[i] if i >= 0 else arcs[~i][::-1]
            pts.extend(a if not pts else a[1:])
        return pts

    polys = []
    for g in tj["objects"]["land"]["geometries"]:
        if g["type"] == "Polygon":
            polys.append(g["arcs"])
        elif g["type"] == "MultiPolygon":
            polys.extend(g["arcs"])

    d = []
    for poly in polys:
        for ring in poly:
            pts = ring_points(ring)
            lats = [p[1] for p in pts]
            if max(lats) < LAT_MIN or min(lats) > LAT_MAX:
                continue
            seg = []
            last = None
            prev_lon = None
            for lon, lat in pts:
                lat = max(min(lat, LAT_MAX), LAT_MIN)
                if prev_lon is not None and abs(lon - prev_lon) > 180:
                    # vòng bị cắt ở kinh tuyến 180: bắt đầu nét mới, không kẻ ngang qua bản đồ
                    if len(seg) > 2:
                        d.append(seg)
                    seg, last = [], None
                prev_lon = lon
                x, y = project(lon, lat)
                if last and math.hypot(x - last[0], y - last[1]) < STEP:
                    continue
                seg.append((x, y))
                last = (x, y)
            if len(seg) > 2:
                d.append(seg)

    parts = []
    for seg in d:
        x0, y0 = seg[0]
        s = f"M{x0:.1f} {y0:.1f}"
        px, py = round(x0, 1), round(y0, 1)
        for x, y in seg[1:]:
            rx, ry = round(x, 1), round(y, 1)
            s += f"l{rx - px:.1f} {ry - py:.1f}".replace(".0 ", " ").replace("l-0.0", "l0").replace(" -0.0", " 0")
            px, py = rx, ry
        parts.append(s + "z")
    path = "".join(parts)
    w, h = round(360 * K * C, 1), round(180 * K, 1)
    js = (
        "/* Sổ tay đọc sách · nền bản đồ thế giới cho trang Bản đồ hành trình. File sinh tự động bằng\n"
        "   tools/make-map-land.py từ dữ liệu Natural Earth 1:110m (miền công cộng, qua gói world-atlas). Đừng sửa tay.\n"
        "   Phép chiếu: x = (kinh độ + 180) * K * C, y = (90 - vĩ độ) * K. */\n"
        f"window.MAP_LAND = {{ K: {K}, C: {C}, w: {w}, h: {h}, d: \"{path}\" }};\n"
    )
    open(out, "w", encoding="utf-8").write(js)
    print(f"{out}: {len(js) // 1024} KB, {len(parts)} nét")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
    main(sys.argv[1], os.path.join(root, "assets", "js", "map-land.js"))
