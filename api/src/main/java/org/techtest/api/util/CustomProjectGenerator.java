package org.techtest.api.util;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class CustomProjectGenerator implements IdentifierGenerator {

    private static final AtomicInteger counter = new AtomicInteger(0);

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) {
        int id = counter.incrementAndGet();
        return String.format("PROJ-%04d", id);
    }
}