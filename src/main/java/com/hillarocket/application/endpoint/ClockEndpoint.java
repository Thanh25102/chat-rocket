package com.hillarocket.application.endpoint;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.EndpointSubscription;
import dev.hilla.Nonnull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reactor.core.publisher.Flux;

import java.time.Duration;

@BrowserCallable
@AnonymousAllowed
public class ClockEndpoint {
    private static final Logger LOGGER = LoggerFactory.getLogger(ClockEndpoint.class);

    public Flux<Integer> getClock() {
        int timer = 60;
        return Flux.interval(Duration.ofSeconds(1))
                .onBackpressureDrop()
                .map(_interval -> timer - 1);
    }

    public EndpointSubscription<@Nonnull Integer> getClockCancellable() {
        return EndpointSubscription.of(getClock(), () ->
                LOGGER.info("Subscription has been cancelled")
        );
    }
}
