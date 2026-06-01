# DESIGN.md — “Simpl iOS Design” System for Swift / SwiftUI

> A practical implementation guide for recreating the visual language shown in the reference screens: soft iOS minimalism, oversized editorial typography, glassy gradient data cards, rounded modular widgets, subtle dotted instrumentation, and calm high-contrast controls.

---

## 1. Design Intent

This style is a hybrid of:

- **iOS-native product UI**: safe-area aware layout, Dynamic Island spacing, bottom gesture area, large navigation titles, SF-style typography, tactile controls.
- **Editorial landing-page composition**: big black headline blocks, very pale background copy, asymmetrical supporting labels, generous whitespace.
- **Glassmorphism-lite**: not heavy blur everywhere, but translucent-looking pastel gradient cards with soft luminance and rounded corners.
- **Instrument-panel visuals**: dotted numerals, small gauges, arcs, tick marks, timeline dots, micro charts.
- **Soft brutal minimalism**: a small number of elements, strong black type, circular buttons, bold spacing, restrained iconography.

The overall feeling should be: **technical, calm, premium, futuristic, and lightweight**. Avoid skeuomorphic shadows, loud saturated colors, dense dashboards, heavy borders, or conventional material-card UI.

---

## 2. Visual Diagnosis of the Reference Images

### 2.1 Composition

The screenshots are not only app screens; they are presented inside a larger marketing composition. The phone screen itself follows an app layout, while the surrounding page uses editorial copy and floating labels.

Inside the phone:

- A large title sits at the top-left: `Analytics` or `Watch`.
- Status bar remains visible and native-feeling.
- Top-right uses a minimal downward chevron, not a filled button.
- Main content is card-first:
  - Screen 4 and 5: stacked, overlapping large cards.
  - Screen 3: grid of four compact cards.
- Bottom control bar is extremely minimal:
  - Left circular `x` button.
  - Center dial or pager indicator.
  - Right circular `+` button.
  - Gesture home indicator remains visible.

Outside the phone:

- Pale grey background.
- Very large left headline:
  - First line black.
  - Secondary lines pale grey.
- Small top labels and right-side annotations.
- Black abstract voice/wave glyph at right.
- Pagination bubble top-right.

For a Swift app, implement the **phone UI language** first. The landing-page surroundings are useful if you are building onboarding, marketing, or empty states.

---

## 3. Core Design Principles

### 3.1 Fewer surfaces, stronger hierarchy

Use fewer containers than a typical dashboard. Make one or four cards dominate the viewport. Let whitespace separate content instead of borders.

### 3.2 Rounded geometry everywhere

The dominant geometry is a superellipse-like rounded rectangle.

Recommended radii:

| Element | Radius |
|---|---:|
| Large weather card | 28–34 pt |
| Small grid card | 18–24 pt |
| Floating circular buttons | 30–36 pt, circle |
| Pill controls | 18–24 pt |
| Small badges | 10–14 pt |

Prefer continuous corners in SwiftUI:

```swift
RoundedRectangle(cornerRadius: 30, style: .continuous)
```

### 3.3 Typography is the interface

The design relies heavily on type scale, weight, and opacity.

- Top screen title: large, black, heavy.
- Card label: small-to-medium, black, semibold/bold.
- Card sublabel: same size or slightly smaller, grey, medium.
- Main metric: very large, dotted or thin technical style.
- Captions: small, grey, low contrast.

### 3.4 Gradients are functional surfaces

Gradients are not decorative backgrounds only. They define the card’s data mood:

- Green/cyan/yellow = weather/daylight/health.
- Purple/pink = wind/sleep/ambient state.
- Orange/yellow = mood/enhancement/energy.
- Muted brown/rose = light variability/neutral data.

### 3.5 Data graphics are quiet

Charts are ultra-light:

- Thin black or low-opacity strokes.
- Dots instead of thick bars.
- Sparse ticks.
- No legends unless essential.
- Labels placed directly in the card.

### 3.6 Controls float; they do not dominate

Buttons are nearly white, circular, soft, and low-shadow. Their icons are black and simple.

---

## 4. Color System

### 4.1 App-level neutrals

Use a warm, near-white UI background rather than pure white.

```swift
enum AppColor {
    static let appBackground = Color(red: 0.955, green: 0.955, blue: 0.945) // #F4F4F1 approx
    static let pageBackground = Color(red: 0.880, green: 0.890, blue: 0.885) // #E0E3E1 approx

    static let primaryText = Color(red: 0.035, green: 0.035, blue: 0.035) // near black
    static let secondaryText = Color.black.opacity(0.42)
    static let tertiaryText = Color.black.opacity(0.24)
    static let hairline = Color.black.opacity(0.08)

    static let whiteControl = Color.white.opacity(0.78)
    static let softControl = Color.white.opacity(0.62)
}
```

### 4.2 Brand accent

The reference uses red only as a tiny active marker in the bottom dial/pager. Keep the accent small.

```swift
static let activeRed = Color(red: 0.86, green: 0.04, blue: 0.07) // #DB0A12 approx
```

Rules:

- Do not flood screens with red.
- Use red for selected index, active tick, warning micro-state, or one primary dot.
- Large CTAs should remain neutral unless the product has a strong need for color.

### 4.3 Gradient palettes

#### Weather Card — Day / Good Sun

```swift
let weatherDayGradient = LinearGradient(
    colors: [
        Color(red: 0.50, green: 0.87, blue: 0.96), // cyan sky
        Color(red: 0.78, green: 0.96, blue: 0.45), // lime glow
        Color(red: 0.36, green: 0.91, blue: 0.35)  // green base
    ],
    startPoint: .topLeading,
    endPoint: .bottomTrailing
)
```

#### Wind Card — Violet / Pink

```swift
let windGradient = LinearGradient(
    colors: [
        Color(red: 0.35, green: 0.28, blue: 0.86), // blue-violet
        Color(red: 0.93, green: 0.45, blue: 0.88), // pink
        Color(red: 0.98, green: 0.58, blue: 0.45)  // coral base
    ],
    startPoint: .topTrailing,
    endPoint: .bottomLeading
)
```

#### Sleep Card — Purple / Lilac

```swift
let sleepGradient = LinearGradient(
    colors: [
        Color(red: 0.44, green: 0.28, blue: 0.91),
        Color(red: 0.83, green: 0.52, blue: 0.90),
        Color(red: 0.83, green: 0.73, blue: 0.81)
    ],
    startPoint: .topLeading,
    endPoint: .bottomTrailing
)
```

#### Mood Card — Orange / Yellow

```swift
let moodGradient = LinearGradient(
    colors: [
        Color(red: 1.00, green: 0.36, blue: 0.08),
        Color(red: 1.00, green: 0.63, blue: 0.11),
        Color(red: 0.95, green: 0.77, blue: 0.14)
    ],
    startPoint: .topTrailing,
    endPoint: .bottomLeading
)
```

#### Neutral Light Variability Card

```swift
let variabilityGradient = LinearGradient(
    colors: [
        Color(red: 0.91, green: 0.86, blue: 0.80),
        Color(red: 0.75, green: 0.52, blue: 0.55),
        Color(red: 0.58, green: 0.22, blue: 0.34)
    ],
    startPoint: .topLeading,
    endPoint: .bottomTrailing
)
```

### 4.4 Gradient layering

The reference gradients feel luminous because they include soft radial glows. In SwiftUI, layer a base gradient plus translucent blurred circles.

```swift
struct LuminousGradientBackground: View {
    let base: [Color]
    let glowA: Color
    let glowB: Color

    var body: some View {
        ZStack {
            LinearGradient(colors: base, startPoint: .topLeading, endPoint: .bottomTrailing)

            Circle()
                .fill(glowA.opacity(0.45))
                .frame(width: 260, height: 260)
                .blur(radius: 42)
                .offset(x: -80, y: -90)

            Circle()
                .fill(glowB.opacity(0.38))
                .frame(width: 300, height: 300)
                .blur(radius: 54)
                .offset(x: 90, y: 120)
        }
        .clipped()
    }
}
```

---

## 5. Typography System

### 5.1 Font choice

For SwiftUI, start with the system font. The reference resembles SF Pro for most labels, with a dotted display face for large metrics.

Recommended approach:

- Use `.system(...)` for interface text.
- Use a custom dotted font only for metrics if you can license one.
- If no dotted font is available, approximate with `.system(size:weight:design: .rounded)` or draw dotted numerals manually.

Do not ship an unlicensed font.

### 5.2 Type scale

```swift
enum AppType {
    static let screenTitle = Font.system(size: 34, weight: .black, design: .default)
    static let cardTitle = Font.system(size: 19, weight: .bold, design: .default)
    static let cardSubtitle = Font.system(size: 19, weight: .semibold, design: .default)
    static let smallTitle = Font.system(size: 15, weight: .bold, design: .default)
    static let caption = Font.system(size: 13, weight: .medium, design: .default)
    static let micro = Font.system(size: 11, weight: .medium, design: .default)
    static let metricLarge = Font.system(size: 74, weight: .thin, design: .rounded)
    static let metricMedium = Font.system(size: 44, weight: .thin, design: .rounded)
}
```

### 5.3 Text opacity

The reference uses opacity aggressively.

| Role | Color |
|---|---|
| Screen title | black / 92–100% |
| Main card label | black / 85–95% |
| Secondary card label | black / 38–50% |
| Data captions | black / 35–50% |
| Decorative surrounding text | black / 18–30% |

### 5.4 Dotted numerals

The biggest signature is the dotted metric typography: `29°`, `07`, `25%`, `93`, `75`.

#### Option A — Use a custom display font

Use a licensed dotted or dot-matrix typeface. Register it in the app and wrap it:

```swift
extension Font {
    static func metricDots(size: CGFloat) -> Font {
        .custom("YourLicensedDotMatrixFontName", size: size)
    }
}
```

#### Option B — Draw dotted numerals yourself

For full control, create dot-matrix digit views. This works well if your metrics are numeric and limited.

```swift
struct DotMatrixDigit: View {
    let digit: Character
    let dot: CGFloat
    let spacing: CGFloat

    private let grid: [Character: [String]] = [
        "0": ["111", "101", "101", "101", "111"],
        "1": ["010", "110", "010", "010", "111"],
        "2": ["111", "001", "111", "100", "111"],
        "3": ["111", "001", "111", "001", "111"],
        "4": ["101", "101", "111", "001", "001"],
        "5": ["111", "100", "111", "001", "111"],
        "6": ["111", "100", "111", "101", "111"],
        "7": ["111", "001", "001", "001", "001"],
        "8": ["111", "101", "111", "101", "111"],
        "9": ["111", "101", "111", "001", "111"]
    ]

    var body: some View {
        let rows = grid[digit] ?? ["000", "000", "000", "000", "000"]

        VStack(spacing: spacing) {
            ForEach(rows.indices, id: \.self) { row in
                HStack(spacing: spacing) {
                    ForEach(Array(rows[row]).indices, id: \.self) { col in
                        Circle()
                            .fill(Array(rows[row])[col] == "1" ? Color.black.opacity(0.86) : Color.clear)
                            .frame(width: dot, height: dot)
                    }
                }
            }
        }
    }
}
```

For a refined version, use a 5x7 grid instead of 3x5. The reference has a denser dot matrix, closer to 5x7 or 7x9.

---

## 6. Layout System

### 6.1 Global spacing

```swift
enum Space {
    static let screenX: CGFloat = 24
    static let topTitle: CGFloat = 8
    static let cardPadding: CGFloat = 20
    static let cardGap: CGFloat = 10
    static let gridGap: CGFloat = 10
    static let bottomControlsHeight: CGFloat = 92
}
```

### 6.2 Screen skeleton

Use a single vertical stack:

1. Native status area.
2. Header row.
3. Main content region.
4. Flexible whitespace if needed.
5. Bottom controls.

```swift
struct AnalyticsScreen: View {
    var body: some View {
        ZStack {
            AppColor.appBackground.ignoresSafeArea()

            VStack(spacing: 0) {
                header
                    .padding(.horizontal, Space.screenX)
                    .padding(.top, 8)

                mainContent
                    .padding(.horizontal, Space.screenX)
                    .padding(.top, 24)

                Spacer(minLength: 12)

                BottomControlBar(index: 3, mode: .dial)
                    .padding(.horizontal, Space.screenX)
                    .padding(.bottom, 8)
            }
        }
    }

    private var header: some View {
        HStack(alignment: .firstTextBaseline) {
            Text("Analytics")
                .font(AppType.screenTitle)
                .foregroundStyle(AppColor.primaryText)

            Spacer()

            Image(systemName: "chevron.down")
                .font(.system(size: 19, weight: .semibold))
                .foregroundStyle(AppColor.primaryText)
                .padding(.top, 8)
        }
    }

    private var mainContent: some View {
        WeatherHeroCard()
    }
}
```

### 6.3 Safe-area behavior

- Keep important controls above the home indicator by at least 16 pt.
- Top title should align under the status bar, not collide with Dynamic Island.
- Avoid full-screen cards touching the phone edges. The reference uses approximately 24 pt horizontal margins.

### 6.4 Card dimensions

For iPhone-sized screens:

| Card type | Width | Height |
|---|---:|---:|
| Hero weather card | screen width - 48 | 610–640 pt |
| Compact grid card | `(screen width - 48 - gap) / 2` | 230–245 pt |
| Bottom circular button | 64–68 pt | 64–68 pt |

Use dynamic sizing:

```swift
let cardWidth = proxy.size.width - 48
let heroHeight = min(proxy.size.height * 0.64, 640)
```

---

## 7. Card Architecture

### 7.1 Base card

```swift
struct GlassGradientCard<Content: View>: View {
    let cornerRadius: CGFloat
    let background: AnyView
    let content: Content

    init(
        cornerRadius: CGFloat = 30,
        background: some View,
        @ViewBuilder content: () -> Content
    ) {
        self.cornerRadius = cornerRadius
        self.background = AnyView(background)
        self.content = content()
    }

    var body: some View {
        ZStack(alignment: .topLeading) {
            background

            content
                .padding(20)
        }
        .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
        .overlay {
            RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                .stroke(Color.white.opacity(0.22), lineWidth: 1)
        }
    }
}
```

### 7.2 Card label block

The card label block is usually top-left:

```swift
struct CardHeader: View {
    let title: String
    let subtitle: String

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(title)
                .font(AppType.cardTitle)
                .foregroundStyle(Color.black.opacity(0.88))
            Text(subtitle)
                .font(AppType.cardSubtitle)
                .foregroundStyle(Color.black.opacity(0.42))
        }
    }
}
```

### 7.3 Hero weather card anatomy

The weather card in the second reference has:

- Top-left label: `Weather / Today`.
- Center metric: `29°`, dot-matrix style.
- Below metric: `Sun / New York`.
- Sun arc visualization in the lower middle.
- Bottom row: sunrise, current condition icon/label, sunset.

```swift
struct WeatherHeroCard: View {
    var body: some View {
        GlassGradientCard(
            cornerRadius: 30,
            background: LuminousGradientBackground(
                base: [
                    Color(red: 0.52, green: 0.86, blue: 0.96),
                    Color(red: 0.76, green: 0.96, blue: 0.46),
                    Color(red: 0.38, green: 0.91, blue: 0.34)
                ],
                glowA: .white,
                glowB: .yellow
            )
        ) {
            VStack(alignment: .leading, spacing: 0) {
                CardHeader(title: "Weather", subtitle: "Today")

                Spacer(minLength: 52)

                VStack(spacing: 10) {
                    Text("29°")
                        .font(AppType.metricLarge)
                        .fontWeight(.ultraLight)
                        .foregroundStyle(Color.black.opacity(0.82))
                        .tracking(1)

                    VStack(spacing: 0) {
                        Text("Sun")
                            .font(.system(size: 18, weight: .semibold))
                        Text("New York")
                            .font(.system(size: 16, weight: .medium))
                            .foregroundStyle(Color.black.opacity(0.38))
                    }
                }
                .frame(maxWidth: .infinity)

                Spacer()

                SunPathGraph()
                    .frame(height: 160)
                    .padding(.horizontal, 10)

                HStack(alignment: .bottom) {
                    VStack(alignment: .leading, spacing: 2) {
                        Text("6:14")
                            .font(.system(size: 22, weight: .medium))
                        Text("Sunrise")
                            .font(AppType.caption)
                            .foregroundStyle(Color.black.opacity(0.42))
                    }

                    Spacer()

                    VStack(spacing: 4) {
                        Image(systemName: "sunrise.fill")
                            .font(.system(size: 22, weight: .medium))
                        Text("Good Sun")
                            .font(AppType.caption)
                            .foregroundStyle(Color.black.opacity(0.48))
                    }

                    Spacer()

                    VStack(alignment: .trailing, spacing: 2) {
                        Text("17:21")
                            .font(.system(size: 22, weight: .medium))
                        Text("Sunset")
                            .font(AppType.caption)
                            .foregroundStyle(Color.black.opacity(0.42))
                    }
                }
            }
        }
        .frame(height: 630)
    }
}
```

---

## 8. Graph and Instrumentation Style

### 8.1 Sun path graph

The sun path is a thin arc with a dot at the current position, plus a dotted baseline.

```swift
struct SunPathGraph: View {
    var progress: CGFloat = 0.62

    var body: some View {
        Canvas { context, size in
            let rect = CGRect(x: 24, y: 20, width: size.width - 48, height: size.height * 0.78)
            let baseY = rect.maxY - 16

            // Dotted low arc / horizon
            var dotted = Path()
            dotted.move(to: CGPoint(x: rect.minX, y: baseY))
            dotted.addQuadCurve(
                to: CGPoint(x: rect.maxX, y: baseY),
                control: CGPoint(x: rect.midX, y: baseY + 78)
            )
            context.stroke(
                dotted,
                with: .color(.black.opacity(0.18)),
                style: StrokeStyle(lineWidth: 1, dash: [2, 10], dashCap: .round)
            )

            // Main arc
            var arc = Path()
            arc.move(to: CGPoint(x: rect.minX + 28, y: baseY - 20))
            arc.addQuadCurve(
                to: CGPoint(x: rect.maxX - 28, y: baseY - 20),
                control: CGPoint(x: rect.midX, y: rect.minY)
            )
            context.stroke(
                arc,
                with: .color(.black.opacity(0.82)),
                style: StrokeStyle(lineWidth: 2, lineCap: .round)
            )

            // Anchor dots
            for x in [rect.minX + 28, rect.midX, rect.maxX - 28] {
                context.fill(
                    Path(ellipseIn: CGRect(x: x - 3, y: baseY - 23, width: 6, height: 6)),
                    with: .color(.black.opacity(0.86))
                )
            }

            // Current sun position, approximate along curve
            let x = rect.minX + 28 + (rect.width - 56) * progress
            let t = progress
            let y = pow(1 - 2 * t, 2) * (baseY - 20) + 2 * (1 - t) * t * rect.minY + pow(t, 2) * (baseY - 20)

            context.fill(
                Path(ellipseIn: CGRect(x: x - 18, y: y - 18, width: 36, height: 36)),
                with: .color(.black.opacity(0.12))
            )
            context.draw(
                Text("☀︎").font(.system(size: 20, weight: .regular)),
                at: CGPoint(x: x, y: y)
            )
        }
    }
}
```

### 8.2 Wind compass graph

The wind screen uses:

- Cardinal letters around a circular center.
- A large translucent circular disk.
- A small directional wedge/line pointing east.
- Low-opacity dotted time series at the bottom.

Implementation notes:

- Use `Canvas` for the circle and directional wedge.
- Make the central disk white at 35–45% opacity.
- Keep cardinal labels small and low contrast.

### 8.3 Tick strips

The compact grid cards show thin vertical tick marks. Use repeated rectangles with variable heights.

```swift
struct TickStrip: View {
    let count: Int
    let activeIndex: Int?

    var body: some View {
        HStack(alignment: .center, spacing: 3) {
            ForEach(0..<count, id: \.self) { index in
                Capsule()
                    .fill(index == activeIndex ? Color.black.opacity(0.72) : Color.black.opacity(0.16))
                    .frame(width: 1, height: tickHeight(index))
            }
        }
    }

    private func tickHeight(_ index: Int) -> CGFloat {
        let wave = sin(Double(index) * 0.42)
        return CGFloat(12 + max(0, wave) * 28)
    }
}
```

### 8.4 Circular gauge

The Sleep and Light Variability cards use thin circular gauge forms. Avoid heavy progress rings. Use low-opacity circular strokes and tiny accent lines.

```swift
struct ThinCircularGauge: View {
    let value: Double // 0...1

    var body: some View {
        ZStack {
            Circle()
                .stroke(Color.black.opacity(0.10), lineWidth: 1)

            Circle()
                .trim(from: 0, to: value)
                .stroke(Color.black.opacity(0.26), style: StrokeStyle(lineWidth: 1.2, lineCap: .round))
                .rotationEffect(.degrees(-90))
        }
    }
}
```

---

## 9. Stacked Card Pattern

In screens 4 and 5, the main card appears in front of two or three cards peeking behind it. This gives depth without heavy shadows.

### 9.1 Rules

- Back cards have the same radius.
- Back cards are offset upward by roughly -22 and -36 pt.
- Back cards are narrower or horizontally shifted slightly.
- Back cards are partially visible only at the top.
- Avoid dark shadows; use geometry and color overlap.

```swift
struct StackedCards<Front: View>: View {
    let front: Front

    init(@ViewBuilder front: () -> Front) {
        self.front = front()
    }

    var body: some View {
        ZStack(alignment: .top) {
            RoundedRectangle(cornerRadius: 28, style: .continuous)
                .fill(Color.yellow.opacity(0.45))
                .frame(height: 620)
                .padding(.horizontal, 52)
                .offset(y: -42)

            RoundedRectangle(cornerRadius: 28, style: .continuous)
                .fill(Color.blue.opacity(0.35))
                .frame(height: 620)
                .padding(.horizontal, 28)
                .offset(y: -24)

            front
        }
    }
}
```

### 9.2 Interaction

Use horizontal swipes or vertical stack expansion:

- Tap front card: open detail.
- Swipe left/right: cycle cards.
- Drag down/up: reveal stacked cards.
- Bottom dial index updates with card position.

Keep animation springy but not bouncy:

```swift
.animation(.spring(response: 0.42, dampingFraction: 0.86), value: selectedIndex)
```

---

## 10. Compact Grid Pattern

The Watch screen uses a 2x2 grid of rounded cards.

### 10.1 Layout

- Screen title: `Watch`.
- Cards begin near top, directly below title.
- 2 columns, tight 10 pt gap.
- Cards are equal size.
- Large empty lower area creates calmness.
- Bottom controls remain anchored.

```swift
struct WatchGridScreen: View {
    let columns = [
        GridItem(.flexible(), spacing: 10),
        GridItem(.flexible(), spacing: 10)
    ]

    var body: some View {
        ZStack {
            AppColor.appBackground.ignoresSafeArea()

            VStack(spacing: 0) {
                Header(title: "Watch")
                    .padding(.horizontal, 24)
                    .padding(.top, 8)

                LazyVGrid(columns: columns, spacing: 10) {
                    MetricMiniCard(kind: .weather)
                    MetricMiniCard(kind: .sleep)
                    MetricMiniCard(kind: .light)
                    MetricMiniCard(kind: .mood)
                }
                .padding(.horizontal, 24)
                .padding(.top, 24)

                Spacer()

                BottomControlBar(index: nil, mode: .edit)
                    .padding(.horizontal, 24)
                    .padding(.bottom, 8)
            }
        }
    }
}
```

### 10.2 Mini card information hierarchy

Each mini card follows this hierarchy:

1. Top-left label and sublabel.
2. Main metric centered or slightly right-biased.
3. Decorative chart layer behind or below metric.
4. Bottom-left final state label.

Do not cram extra metadata.

---

## 11. Bottom Controls

### 11.1 Visual anatomy

The bottom control region contains:

- Left circle button: close / cancel.
- Center control:
  - Dial with ticks and red selected index for analytics screens.
  - Small pager pill and `Edite`/`Edit` pill for grid screen.
- Right circle button: add.
- Black home indicator under everything.

### 11.2 Circle button

```swift
struct SoftCircleButton: View {
    let systemName: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: systemName)
                .font(.system(size: 18, weight: .bold))
                .foregroundStyle(Color.black)
                .frame(width: 64, height: 64)
                .background {
                    Circle()
                        .fill(Color.white.opacity(0.70))
                        .shadow(color: .black.opacity(0.035), radius: 10, x: 0, y: 4)
                }
        }
        .buttonStyle(.plain)
    }
}
```

### 11.3 Dial index control

```swift
struct DialIndexControl: View {
    let index: Int
    let tickCount: Int = 33

    var body: some View {
        ZStack {
            HStack(alignment: .bottom, spacing: 5) {
                ForEach(0..<tickCount, id: \.self) { i in
                    Capsule()
                        .fill(i == tickCount / 2 ? AppColor.activeRed : Color.black.opacity(0.35))
                        .frame(width: 1, height: tickHeight(i))
                }
            }
            .frame(height: 58)
            .mask(
                LinearGradient(
                    colors: [.clear, .black, .black, .clear],
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )

            Text("\(index)")
                .font(.system(size: 14, weight: .bold))
                .foregroundStyle(.white)
                .frame(width: 30, height: 30)
                .background(Circle().fill(AppColor.activeRed))
                .offset(y: 22)
        }
        .frame(width: 210, height: 78)
    }

    private func tickHeight(_ i: Int) -> CGFloat {
        let center = Double(tickCount - 1) / 2.0
        let distance = abs(Double(i) - center) / center
        return CGFloat(8 + (1 - distance) * 42)
    }
}
```

### 11.4 Bottom bar wrapper

```swift
enum BottomMode {
    case dial
    case edit
}

struct BottomControlBar: View {
    let index: Int?
    let mode: BottomMode

    var body: some View {
        VStack(spacing: 4) {
            HStack {
                SoftCircleButton(systemName: "xmark") {}

                Spacer()

                switch mode {
                case .dial:
                    DialIndexControl(index: index ?? 1)
                case .edit:
                    VStack(spacing: 14) {
                        Capsule()
                            .fill(Color.black.opacity(0.85))
                            .frame(width: 24, height: 8)
                            .overlay(alignment: .trailing) {
                                Circle()
                                    .fill(Color.black.opacity(0.10))
                                    .frame(width: 8, height: 8)
                                    .offset(x: 14)
                            }

                        Text("Edit")
                            .font(.system(size: 13, weight: .medium))
                            .foregroundStyle(Color.black.opacity(0.72))
                            .padding(.horizontal, 22)
                            .padding(.vertical, 10)
                            .background(Capsule().fill(Color.white.opacity(0.45)))
                    }
                }

                Spacer()

                SoftCircleButton(systemName: "plus") {}
            }

            Capsule()
                .fill(Color.black)
                .frame(width: 134, height: 5)
                .padding(.top, 2)
        }
    }
}
```

---

## 12. Iconography

Use SF Symbols, but choose simple symbols and consistent weights.

Recommended:

| Action | Symbol |
|---|---|
| Add | `plus` |
| Close | `xmark` |
| Expand/filter | `chevron.down` |
| Sunrise | `sunrise.fill` |
| Weather | `sun.max` or custom sun glyph |
| Voice | custom capsules/circles, not necessarily SF Symbol |

Rules:

- Use `semibold` or `bold` for control icons.
- Do not use multicolor SF Symbols.
- Avoid outlined icon clutter inside cards.
- Decorative icons should be low opacity unless they are central data marks.

---

## 13. Motion Design

### 13.1 Motion personality

Motion should feel like iOS physics: smooth, contained, and responsive.

Use:

- `spring(response: 0.4–0.55, dampingFraction: 0.82–0.92)` for card transitions.
- `easeInOut(duration: 0.18–0.26)` for small opacity changes.
- Slow ambient gradient movement only if it does not distract.

Avoid:

- Rubber-band overshoot.
- Large rotations.
- Neon/glow animations.
- Constant pulsing indicators.

### 13.2 Card paging

```swift
.gesture(
    DragGesture(minimumDistance: 16)
        .onEnded { value in
            if value.translation.width < -40 { selectedIndex += 1 }
            if value.translation.width > 40 { selectedIndex -= 1 }
        }
)
.animation(.spring(response: 0.44, dampingFraction: 0.88), value: selectedIndex)
```

### 13.3 Data entrance

Metrics can fade/slide in subtly:

```swift
.transition(.opacity.combined(with: .offset(y: 8)))
```

---

## 14. Haptics

Use haptics sparingly:

- Card changed: light selection feedback.
- Add button: medium impact.
- Delete/close: light impact.
- Dial tick crossing: selection feedback, throttled.

```swift
let generator = UISelectionFeedbackGenerator()
generator.selectionChanged()
```

---

## 15. Accessibility

This style uses low-contrast secondary text, so accessibility needs explicit handling.

### 15.1 Dynamic Type

- Support at least up to `.accessibility2`.
- For large metrics, allow scaling but cap where necessary.
- Cards should expand vertically when text size increases.

```swift
@ScaledMetric(relativeTo: .largeTitle) var metricSize: CGFloat = 74
```

### 15.2 Contrast mode

When `accessibilityContrast == .increased`:

- Raise secondary text opacity from 0.42 to 0.62.
- Increase hairline opacity from 0.08 to 0.16.
- Avoid white-on-gradient text unless contrast is verified.

```swift
@Environment(\.accessibilityContrast) var contrast

var secondaryOpacity: Double {
    contrast == .increased ? 0.62 : 0.42
}
```

### 15.3 Reduce transparency

When reduce transparency is enabled:

- Replace translucent controls with solid off-white.
- Simplify gradients if text readability suffers.

### 15.4 VoiceOver labels

A visual card may say `29° / Sun / New York`; VoiceOver should say:

> “Weather today. 29 degrees. Sunny in New York. Sunrise 6:14. Sunset 17:21.”

---

## 16. SwiftUI File Structure

Recommended structure:

```text
DesignSystem/
  AppColor.swift
  AppType.swift
  Space.swift
  Radius.swift
  Motion.swift

Components/
  GlassGradientCard.swift
  LuminousGradientBackground.swift
  CardHeader.swift
  SoftCircleButton.swift
  BottomControlBar.swift
  DialIndexControl.swift
  TickStrip.swift
  ThinCircularGauge.swift
  DotMatrixDigit.swift

Screens/
  AnalyticsScreen.swift
  WeatherHeroCard.swift
  WindHeroCard.swift
  WatchGridScreen.swift
  MetricMiniCard.swift

Utilities/
  Haptics.swift
  AccessibilityValues.swift
```

---

## 17. Implementation Checklist

### Phase 1 — Foundation

- [ ] Set app background to warm off-white.
- [ ] Define typography tokens.
- [ ] Define spacing/radius tokens.
- [ ] Build `GlassGradientCard`.
- [ ] Build `LuminousGradientBackground`.
- [ ] Build `SoftCircleButton`.
- [ ] Build `BottomControlBar`.

### Phase 2 — Hero Cards

- [ ] Build Weather hero card.
- [ ] Build Wind hero card.
- [ ] Add stacked-card peeking layers.
- [ ] Add simple swipe paging.
- [ ] Add dial index control.

### Phase 3 — Grid Dashboard

- [ ] Build 2x2 grid layout.
- [ ] Build mini cards for weather, sleep, variability, mood.
- [ ] Add gauge/tick/circle chart components.
- [ ] Add pager/edit bottom mode.

### Phase 4 — Polish

- [ ] Replace metric font with licensed dotted font or custom dot-matrix renderer.
- [ ] Add haptics.
- [ ] Add accessibility labels.
- [ ] Test light/dark assumptions. This style is primarily light-mode.
- [ ] Test on iPhone SE, standard iPhone, Pro Max.

---

## 18. Do / Don’t

### Do

- Use large empty spaces.
- Use black typography confidently.
- Keep secondary text very quiet.
- Use pastel gradients as semantic surfaces.
- Use rounded continuous corners.
- Use minimal custom charts.
- Make controls circular and soft.
- Keep accent color rare.

### Don’t

- Do not add heavy drop shadows.
- Do not use thick borders.
- Do not use dense chart axes.
- Do not use many bright accents at once.
- Do not make every card the same gradient.
- Do not over-label data.
- Do not use default blue iOS buttons.
- Do not make cards look like standard grouped-list cells.

---

## 19. Example Mini Card Component

```swift
enum MiniCardKind {
    case weather, sleep, light, mood

    var title: String {
        switch self {
        case .weather: "Weather"
        case .sleep: "Sleep"
        case .light: "Light Variability"
        case .mood: "Enhance"
        }
    }

    var subtitle: String {
        switch self {
        case .weather: "Today"
        case .sleep: "Quality"
        case .light: ""
        case .mood: "Mood"
        }
    }

    var footer: String {
        switch self {
        case .weather: "Sun"
        case .sleep: "Vitamin D"
        case .light: "Normal"
        case .mood: "Nice"
        }
    }

    var metric: String {
        switch self {
        case .weather: "29°"
        case .sleep: "25%"
        case .light: "75"
        case .mood: "93"
        }
    }
}

struct MetricMiniCard: View {
    let kind: MiniCardKind

    var body: some View {
        ZStack(alignment: .topLeading) {
            background

            VStack(alignment: .leading, spacing: 0) {
                VStack(alignment: .leading, spacing: 0) {
                    Text(kind.title)
                        .font(AppType.smallTitle)
                        .foregroundStyle(Color.black.opacity(0.86))
                    if !kind.subtitle.isEmpty {
                        Text(kind.subtitle)
                            .font(AppType.caption)
                            .foregroundStyle(Color.black.opacity(0.45))
                    }
                }

                Spacer()

                Text(kind.metric)
                    .font(AppType.metricMedium)
                    .foregroundStyle(Color.black.opacity(0.78))
                    .frame(maxWidth: .infinity, alignment: .center)
                    .offset(y: -8)

                Spacer()

                Text(kind.footer)
                    .font(AppType.caption)
                    .foregroundStyle(Color.black.opacity(0.68))
            }
            .padding(16)
        }
        .frame(height: 232)
        .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
    }

    @ViewBuilder
    private var background: some View {
        switch kind {
        case .weather:
            LuminousGradientBackground(
                base: [.cyan.opacity(0.55), .green.opacity(0.58), .yellow.opacity(0.28)],
                glowA: .white,
                glowB: .green
            )
        case .sleep:
            LuminousGradientBackground(
                base: [.purple.opacity(0.70), .pink.opacity(0.50), .gray.opacity(0.20)],
                glowA: .white,
                glowB: .purple
            )
        case .light:
            LuminousGradientBackground(
                base: [.white.opacity(0.5), .brown.opacity(0.28), .pink.opacity(0.32)],
                glowA: .yellow,
                glowB: .black.opacity(0.2)
            )
        case .mood:
            LuminousGradientBackground(
                base: [.orange.opacity(0.85), .yellow.opacity(0.62), .red.opacity(0.20)],
                glowA: .yellow,
                glowB: .orange
            )
        }
    }
}
```

---

## 20. Final Style Summary

Build the app as if it were a quiet, intelligent instrument:

- **Background**: warm off-white.
- **Typography**: black, heavy titles; quiet grey captions; dotted technical metrics.
- **Cards**: pastel luminous gradients, continuous corners, minimal borders.
- **Charts**: thin, dotted, sparse, embedded directly into cards.
- **Controls**: circular, soft white, simple black symbols.
- **Motion**: calm iOS spring motion, no theatrical effects.
- **Data density**: low. One strong metric per card.

The key is restraint. The design looks premium because it removes everything nonessential and makes the remaining surfaces feel tactile, luminous, and precise.
