package org.techtest.api.util;

import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.stereotype.Component;

@Component("customKeyGenerator")
public class CustomKeyGenerator implements KeyGenerator {

        @Override
        public Object generate(Object target, java.lang.reflect.Method method, Object... params) {
            return target.getClass().getSimpleName() + "_" + method.getName() + "_" + params[0];
        }
}
