##### Запрос на получение фотографии:

api/v1/image/:id

—

##### Запрос на получение следующей\предыдущей фотографии относительно передаваемого id:

```
api/v1/image/:id?(next|prev)=true
```

—

##### Запрос на получение следующей\предыдущей приватной фотографии относительно передаваемого id:

```
api/v1/image/:id?(next|prev)=true&private=true
```

—

##### Запрос на получение следующей\предыдущей публичной фотографии относительно передаваемого id:

```
api/v1/image/:id?(next|prev)=true&public=true
```

—


###### Возвращаемый объект:

```javascript
{
	id:      'String',
	author:  {Object},
	owner:   {Object},
	date:    'String',
	text:    'String',
	animated: Boolean,
	width:    Number,
	height:   Number,
	image: [
		{
			big:   'String',
			small: 'String',
			mini:  'String'
		}
	]
}
```

--------------------------------------

##### Запрос на получение фотографии из медиатеки:

```
api/v1/image/:id?multiple=true
```


###### Возвращаемый объект:

```javascript
{
	id:      'String',
	author:  {Object},
	owner:   {Object},
	date:    'String',
	text:    'String',
	animated: Boolean,
	width:    Number,
	height:   Number,
	next:    {Object} || null, // без полей next и prev
	prev:    {Object} || null, // без полей next и prev
	image: [
		{
			big:   'String',
			small: 'String',
			mini:  'String'
		}
	]
} 
```

--------------------------------------

##### Запрос на получение общего количества фотографий:

```
api/v1/image/count
```

—

##### Запрос на получение количества приватных фотографий:

```
api/v1/image/count?private=true
```

—

##### Запрос на получение количества публичных фотографий:

```
api/v1/image/count?public=true
```

###### Возвращаемый объект:

```javascript
{
	count: Number,
}
```

--------------------------------------

##### Запрос на получение общего количества фотографий и относительной позиции текущей фотографии:

```
api/v1/image/count?id='String'
```

—

##### Запрос на получение количества приватных фотографий и относительной позиции текущей фотографии:

```
api/v1/image/count?id='String'&private=true
```

—

##### Запрос на получение количества приватных фотографий и относительной позиции текущей фотографии:

```
api/v1/image/count?id='String'&public=true
```

###### Возвращаемый объект:

```javascript
{
	count:   Number,
	current: Number
}
```