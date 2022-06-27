# Quotes

## 랜덤 백그라운드와 랜덤 명언을 구현할 것이다.

명언들을 Object로 이루어진 array 로 만든다.

이를 위해 array에 있는 element에 접근해야 한다.

random하게 명언을 불러오기 위해, Math module을 이용할 것이다.
`math.random() * 10` 을 하면 1 ~ 10 사이의 실수가 나온다.
따라서 Integer로 변환을 해줘야 한다.

## Integer 변환

### 올림

```javascript
Math.ceil();
```

### 내림

```javascript
Math.floor();
```

우리는 floor을 사용할 것이다.
아래의 코드를 사용하면 0~10 사이의 숫자를 얻을 수 있다.

```javascript
Math.floor(Math.random() * 10);
```

## quote가 늘어나거나 줄어들 경우?

Array.length를 활용하여 array의 길이를 반환받으면 된다.

```javascript
const quotes = [
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    quote:
      "The world is a book and those who do not travel read only one page.",
    author: "Saint Augustine",
  },
  {
    quote: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller",
  },
  {
    quote: "To Travel is to Live",
    author: "Hans Christian Andersen",
  },
  {
    quote: "Only a life lived for others is a life worthwhile.",
    author: "Albert Einstein",
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
  },
  {
    quote: "Never go on trips with anyone you do ntot love.",
    author: "Hemmingway",
  },
  {
    quote: "We wander for distraction, but we travel for fulfilment.",
    author: "Hilaire Belloc",
  },
  {
    quote: "Travel expands the mind and fills the gap.",
    author: "Sheda Savage",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
```

# background

quote를 넣은 것과 굉장히 유사하다.

랜덤 넘버를 얻어서, 이미지를 고르고, 그 이미지를 Body에 넣어주면 된다 .

우리는 아직까지 Javascript에서 뭔가를 생성해서 Html 에 넣은 적은 없다 .

# img 태그 삽입

img태그 삽입을 위해 javascript가 필요하다.
이때 document.createElement()를 사용한다.

태그를 먼저 삽입한 후에 src 값도 설정해준다.

```javascript
const images = [
  "IMG_0924.jpeg",
  "IMG_1019.jpeg",
  "IMG_2095.jpeg",
  "IMG_2097.jpeg",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

console.log(bgImage);
```

이렇게 하고 나면 bgImage를 body에 추가해주면 된다.
아직 Document에 존재하지 않고, Javascript에만 존재하기 때문이다.

## Body 에 추가

```javascript
document.body.appendChild(bgImage);
```

이렇게 해주면 html 문서 어딘가에 랜덤한 이미지가 삽입되게 되는 것이다.

# Recap

이렇게 하면 랜덤한 것들은 모두 마무리 되었다.

나중에 css를 이용하여 꾸며주기만 하면 된다 .

array에서 Random하게 요소를 가져오는 방법에 대해서 주로 배웠다.

math 를 이용하여 Random 넘버를 고르는 방법도 배웠다.
Mtah.random() 은 0~1사이의 숫자이기 때문에 여기에 array 의 길이만큼을 곱해서, 랜덤 넘버를 만들어줬다.
그 후 integer 변환을 위해 floor를 사용했다.

image도 동일하게 random 으로 구현하고, javascript에서 html 을 추가했다.
이는 document.createElement로 태그를 만들고, document.body.appendChild() 로 html에 추가했다.
