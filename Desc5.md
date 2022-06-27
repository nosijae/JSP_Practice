# Intervals

여러개의 js를 통해 각각의 기능을 파일별로 분류하여 코드를 깔끔하게 한다.

## Interval and Timeout

Interval는 매번 일어나야 하는 것이다.
매 2초마다 뭔가 일어나게 하고 싶으면 interval을 사용한다.

이는 setInterval이라는 함수를 이용하뎜 된다.
setInterval는 두개의 인자를 받는다.
함수와 몇초 간격으로 실행시킬지 선언해주면 된다.

```javascript
function sayHello() {
  console.log("Hello!");
}

// 이렇게 하면 5초마다 sayHello 함수를 호출하게 된다.
setInterval(sayHello, 5000);
```

# Timeouts and Dates

## Timeout

함수를 바로 호출하지 않고, 기다렸다 실행하는 것이다.

```javascript
setTimeout(sayHello, 5000);
```

이렇게 하면 5초를 기다렸다 sayHello 함수를 호출하게 된다.

## Date

Javascript는 date라는 것도 잇따.
굉장히 함수가 많다.

getDate, getHours 등 굉장히 많다.

### date 함수

```javascript
const date = new Date();
date.getDate();
date.getDay();
date.getFullYear();
date.getHours();
date.getMinutes();
date.getSeconds();
```

뭔가를 계속 실행하려면 Interval을 사용하면 된다.
1초마다 시계를 Date를 호출해주면 되는 것이다.
그 후 이 값을 clock으로 넣어주면 된다.

### 코드 예시

```javascript
const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  clock.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

setInterval(getClock, 1000);
```

1초에 한번씩 getClock이라는 함수를 호출하여, Clock을 구현하는 것이다.

# PadStart

string을 문자 두개로 채워야 한다.
즉, 00:00:00 이 형식으로 시간을 표현하는 것이다.

이를 위해서 string이 적어도 2개의 문자로 이루어져야 한다.

padStart라는 function이 있다.

```javascript
"1".padStart(2, "0");
```

이렇게 하면 길이가 1인 string을 길이가 2인 string으로 표현하는데, 이때 길이가 1이라면 앞에 0을 붙이라는 코드이다.

뒤에 붙이는 함수도 있다.
이는 padEnd() 이다.

```javascript
"1".padEnd(2, "0");
```

padStart() 함수는 string이 있으면 적어도 이정도 길이가 되어야 한다는 것을 알려주는 것이다.

## string 변환

날짜는 기본적으로 숫자형 변수이다.
따라서, 이를 String으로 변환해줘야 padStart함수를 적용시킬 수 있다.

### 예시 코드

```javascript
const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${second}`;
}

setInterval(getClock, 1000);
```

이렇게 String의 padStart 함수를 이용하여 00:00:00 형식의 시계를 표현할 수 있다.

# Recap

padStart는 string의 길이를 길게해야할 때 사용하는 Function이다.

function을 정한 시간 마다 실행하기 위해서는 setInterval 함수를 이용한다.

이렇게 하면 실시간으로 함수를 실행하는 것과 같은 효과를 얻을 수 있다.
