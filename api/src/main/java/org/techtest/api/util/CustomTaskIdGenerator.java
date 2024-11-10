package org.techtest.api.util;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class CustomTaskIdGenerator extends CustomProjectGenerator {
    private static final AtomicInteger counter = new AtomicInteger(0);

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) {
        int id = counter.incrementAndGet();
        return String.format("TASK-%04d", id);
    }
}
