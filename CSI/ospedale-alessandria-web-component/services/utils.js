import { format } from 'date-fns';

const baseUrlApi = import.meta.env.VITE_BASE_URL_API;
const baseUrlApiAuth = import.meta.env.VITE_BASE_URL_API_AUTH;
const baseUrlApiManager = import.meta.env.VITE_BASE_URL_API_MANAGER;


export const getApiPath = () => {
  return baseUrlApi;
};

export const getApiPathAuth = () => {
  return baseUrlApiAuth;
};
export const getApiMangerPath = () => {
  return baseUrlApiManager;
};

export const getApiConfigbff = async () => {
  let url = baseUrlApi + "/config/configbff";

  try {
    let response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching API config:", error);
    throw error;
  }
}

export const getUserAth = async () => {
  let url = baseUrlApiAuth + "/me";

  try {
    let response = await fetch(url);

    if (!response.ok) {
      console.warn(`HTTP Error: ${response.status}`);

      if (response.status === 302) {
        console.warn("Redirect detected. Ignoring and proceeding.");
      }
      return null;
    }

    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching API config:", error);
    return null;
  }
};

export const getParam = (paramName) => {
  let urlParams = new URLSearchParams(window.location.search);
  let newParam = urlParams.get(paramName);
  if (newParam) {
    return newParam
  } else {
    return null;
  }
};

export const urlParamsManager = (params = {}, clearParams = false) => {
  let urlParams = clearParams ? new URLSearchParams() : new URLSearchParams(window.location.search);

  if (!clearParams) {
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        urlParams.set(key, params[key]);
      }
    });
  }

  const queryParam = urlParams.toString() ? '?' : '';
  const newURL = `${window.location.pathname}${queryParam}${urlParams.toString()}`;
  window.history.pushState({ path: newURL }, '', newURL);
};

export const scrollTopView = (top) => {
  window.scrollTo({
    top: top,
    behavior: 'smooth'
  });
}

export const formatDate = (date, dateFormat) => {
  return format(new Date(date), dateFormat);
};

export const sanitizeHTML = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const tagsToRemove = ['script', 'iframe', 'object', 'embed', 'link', 'style'];
  tagsToRemove.forEach(tag => {
    const elements = tempDiv.getElementsByTagName(tag);
    while (elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  });

  const attributesToRemove = ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'];
  const allElements = tempDiv.getElementsByTagName('*');
  for (let i = 0; i < allElements.length; i++) {
    attributesToRemove.forEach(attr => {
      if (allElements[i].hasAttribute(attr)) {
        allElements[i].removeAttribute(attr);
      }
    });
  }

  return tempDiv.innerHTML;
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const convertAttachmentZammad = async (file) => {
  try {
    const result = await toBase64(file);
    const res = result.split(",");
    const obj = {
      filename: file.name,
      data: res[1], // Rails Base64.strict_decode64 richiede solo la codifica senza il prefisso
      "mime-type": file.type,
    };
    return obj;
  } catch (error) {
    console.error('Error converting file to Base64:', error);
    return null;
  }
};

export const debounce = (func, delay) => {
  let timeout;
  let promiseResolver;

  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    // Restituisci una Promise per gestire la funzione asincrona
    return new Promise((resolve, reject) => {
      promiseResolver = resolve;

      timeout = setTimeout(async () => {
        try {
          const result = await func(...args); // Aspetta il risultato della funzione asincrona
          promiseResolver(result); // Risolvi la Promise con il risultato
        } catch (error) {
          reject(error); // Gestisci eventuali errori nella callback
        }
      }, delay);
    });
  };
};
