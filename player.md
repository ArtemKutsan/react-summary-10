# 🎧 **Audio Player — State & Reducer Logic**

## 🗂 **Начальное состояние**

```js
const initialState = {
  isPlaying: false, // воспроизведение активно или нет
  currentTime: 0, // текущая позиция трека (0 .. maxTime)
  maxTime: 180, // длительность трека (3 минуты) — константа
  volume: 50, // громкость 0..100
  isMuted: false, // включён ли mute
  previousVolume: 50, // громкость до mute
  playbackRate: 1.0, // скорость воспроизведения
  repeatMode: 'none', // "none" | "one" | "all"
};
```

---

# 🎯 **Задачи редьюсера**

Редьюсер должен уметь:

- работать с булевыми флагами (`isPlaying`, `isMuted`)
- корректно обрабатывать числа и ограничения (`volume`, `currentTime`)
- переключать состояния циклически (`repeatMode`)
- запоминать и восстанавливать значения (`previousVolume` для mute)
- использовать `maxTime` как **константу**, не изменяя её

---

# 🧩 **Экшены и логика**

## ▶️ **playPause**

Переключает `isPlaying`:

- `false → true`
- `true → false`

```js
isPlaying = !isPlaying;
```

---

## ⏱ **setTime(payload)**

Устанавливает `currentTime` с ограничениями:

- если `< 0` → `0`
- если `> maxTime` → `maxTime`

Примеры:

- `setTime(45)` → `currentTime = 45`
- `setTime(-10)` → `currentTime = 0`
- `setTime(999)` → `currentTime = 180`

---

## 🔊 **changeVolume(payload)**

Устанавливает громкость (0–100) + логика mute.

### Ограничения:

- `< 0` → `0`
- `> 100` → `100`

### Дополнительная логика:

- если новая громкость `0` → `isMuted = true`
- если громкость `> 0` и `isMuted === true` → `isMuted = false`
- `previousVolume` **не меняется**, кроме случая toggleMute

Примеры:

- Было: `volume = 50, isMuted = false`  
  → `changeVolume(0)`  
  → `volume = 0, isMuted = true`

- Было: `volume = 0, isMuted = true`  
  → `changeVolume(30)`  
  → `volume = 30, isMuted = false`

---

## 🔇 **toggleMute()**

Включает/выключает mute с запоминанием громкости.

### Если `isMuted === false` (включаем mute):

- `previousVolume = volume`
- `volume = 0`
- `isMuted = true`

### Если `isMuted === true` (выключаем mute):

- `volume = previousVolume`
- `isMuted = false`

Пример:

- Было: `volume = 70, isMuted = false`  
  → `toggleMute()`  
  → `previousVolume = 70, volume = 0, isMuted = true`

- Ещё раз → `volume = 70, isMuted = false`

---

## 🔁 **nextRepeatMode()**

Циклическое переключение:

```
"none" → "one" → "all" → "none" → ...
```

Примеры:

- `"none"` → `"one"`
- `"one"` → `"all"`
- `"all"` → `"none"`

---

## ⚡ **setPlaybackRate(payload)**

Устанавливает скорость воспроизведения.

### Разрешённые значения:

```
0.5, 0.75, 1.0, 1.25, 1.5
```

Если передано что-то другое → **ничего не менять**.

Примеры:

- `setPlaybackRate(1.25)` → `playbackRate = 1.25`
- `setPlaybackRate(2.0)` → игнорируется

---

## ⏩ **seekForward(payload)**

Перемотка вперёд:

```
currentTime = min(currentTime + payload, maxTime)
```

Примеры:

- `120 → +30 → 150`
- `170 → +30 → 180 (ограничение)`

---

## ⏪ **seekBackward(payload)**

Перемотка назад:

```
currentTime = max(currentTime - payload, 0)
```

Примеры:

- `10 → -15 → 0`
- `120 → -30 → 90`
