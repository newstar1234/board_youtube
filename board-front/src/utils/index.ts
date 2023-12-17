export const convertUrlToFile = async (url : string) => {
  const response = await fetch(url); // fetch에서 url 받아옴
  const data = await response.blob(); 
  const extend = url.split('.').pop(); // . 으로 split치고 pop으로 맨뒤에꺼 꺼내옴
  const fileName = url.split('/').pop();
  const meta = { type: `image/${extend}` }; // 특정한 확장자의 메타데이터이다.
  
  return new File([data], fileName as string, meta);
};

// 특정한  url로 받아와서 실제 파일로 타입스크립트로 쓸수있는 파일 객체로 만들어줌 //

export const convertUrlsToFile = async (urls : string[]) => {
  const files : File[] = [];
  for(const url of urls) {
    const file = await convertUrlToFile(url);
    files.push(file);
  }
  return files;
};
